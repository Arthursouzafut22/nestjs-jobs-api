import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsDto } from './dto/jobs-dto';
import type { Request } from 'express';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('publish')
  @UseGuards(AuthGuard)
  createJobs(@Body() jobs: JobsDto, @Req() request: Request) {
    const user = request.user;
    return this.jobsService.createJobs({ ...jobs, userId: user?.id as number });
  }
}
