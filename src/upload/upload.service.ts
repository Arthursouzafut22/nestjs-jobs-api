import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadDto } from './dto/upload-dto';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private supabase_url: string;
  private supabase_key: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.supabase_url = this.config.get<string>('SUPABASE_URL') as string;
    this.supabase_key = this.config.get<string>('SUPABASE_ANON_KEY') as string;
  }
  // Executa em paralelo o upload do PDF para o storage e a persistência dos dados no banco.
  async uploadCurriculum(file: UploadDto[], vacancyId: number, userId: number) {
    const onFile = file[0];

    const supabase = createClient(this.supabase_url, this.supabase_key, {
      auth: { persistSession: false },
    });
    // Faz o upload do arquivo para o storage (bucket supabase) para persistência em nuvem.
    const { data, error } = await supabase.storage
      .from('curriculos')
      .upload(onFile?.originalname, onFile?.buffer, {
        upsert: true,
      });
    if (error) {
      throw new Error('Erro ao enviar para o storage');
    }
    // Gera a URL de download para o documento PDF.
    const path = data.path;
    const urlCurriculum = supabase.storage
      .from('curriculos')
      .getPublicUrl(path, { download: true });

    return await this.applyForVacancy(userId, vacancyId, urlCurriculum);
  }

  // Persiste o registro de candidatura do usuário no banco de dados.
  async applyForVacancy(
    userId: number,
    vacancyId: number,
    urlCurriculum: { data: { publicUrl: string } },
  ) {
    // Impede candidaturas duplicadas do mesmo usuário para a mesma vaga.
    const hasApplied = await this.prisma.resume.findFirst({
      where: { userId, vacancyId },
    });

    if (hasApplied) {
      throw new ConflictException('Você já se candidatou nesta vaga');
    }
    // Realiza o processo de candidatura do usuário
    const applyForJob = await this.prisma.resume.create({
      data: {
        url: urlCurriculum.data.publicUrl,
        userId,
        vacancyId,
      },
    });
    return applyForJob;
  }

  // Recupera as candidaturas de uma vaga e gera, em paralelo, os links para download dos currículos recebidos.
  async downloadCurriculum(vacancyId: number, userId: number) {
    if (!vacancyId) {
      throw new NotFoundException('Não encontrado');
    }

    const download = await this.prisma.resume.findFirst({
      where: { userId, vacancyId },
    });
    return [download];
  }
}
