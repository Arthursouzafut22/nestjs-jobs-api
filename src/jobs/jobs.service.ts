import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsDto } from './dto/jobs-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createJobs(jobs: JobsDto & { userId: number }) {
    const postJobs = await this.prisma.vacancy.create({
      data: jobs,
    });
    return {
      message: 'Vaga publicada com sucesso.',
      postJobs,
    };
  }

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

  findAllPublished() {
    return this.prisma.vacancy.findMany();
  }
}
