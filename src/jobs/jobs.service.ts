import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JobsDto } from './dto/create-jobs-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateJobDto } from './dto/update-jobs-dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}
  // Publicar vagas
  async createJobs(jobs: JobsDto & { userId: number }) {
    const postJobs = await this.prisma.vacancy.create({
      data: jobs,
    });
    return {
      message: 'Vaga publicada com sucesso.',
      postJobs,
    };
  }
  // Buscar vagas publicadas do usuario autenticado...
  async findVacanciesByUser(id: number) {
    const myVacancies = await this.prisma.vacancy.findMany({
      where: { userId: id },
    });

    if (myVacancies.length === 0) {
      return {
        message: 'Nenhuma vaga publicada encontrada',
        myVacancies,
      };
    }

    return myVacancies;
  }

  // Buscar todas vagas publicadas...
  findAllPublished() {
    return this.prisma.vacancy.findMany();
  }

  // Deletar vaga publicada...
  async deleteVacancy(id: number, userId: number) {
    try {
      return await this.prisma.vacancy.delete({ where: { id: id, userId } });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Vaga com o ID ${id} não encontrada.`);
        }
      }

      throw new InternalServerErrorException('Erro ao deletar vaga');
    }
  }

  // Atualizar vaga publicada....
  async updateVacancy(dataUpdate: UpdateJobDto, id: number, userId: number) {
    try {
      return await this.prisma.vacancy.update({
        where: { id: id, userId },
        data: dataUpdate,
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Vaga com o ID ${id} não encontrada.`);
        }
      }
      throw new InternalServerErrorException('Erro ao atualizar vaga');
    }
  }

  // Buscar produto pelo paratmetro de busvar na url...
  async searchJobs(search: string) {
    const searchJobs = await this.prisma.vacancy.findMany({
      where: { jobTitle: search },
    });

    if (searchJobs.length === 0) {
      return {
        message: 'Nenhuma vaga encontrada',
        searchJobs: [],
      };
    }

    return searchJobs;
  }
}
