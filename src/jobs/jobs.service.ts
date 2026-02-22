import { Injectable } from '@nestjs/common';
import { JobsDto } from './dto/jobs-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createJobs(jobs: JobsDto & { userId: number }) {
    const postJobs = await this.prisma.vacancy.create({
      data: jobs,
    });
    return postJobs;
  }
}
