import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsDto } from './dto/create-jobs-dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/infra/providers/roles-guard.provider';
import { User } from 'src/decorators/user.decorator';
import { UpdateJobDto } from './dto/update-jobs-dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('publish')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.RECRUITER, Role.ENTERPRISE])
  createJobs(@Body() jobs: JobsDto, @User('id') id: number) {
    return this.jobsService.createJobs({ ...jobs, userId: id });
  }

  @Get('my-vacancies')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.RECRUITER, Role.ENTERPRISE])
  findVacanciesByUser(@User('id') userId: number) {
    return this.jobsService.findVacanciesByUser(userId);
  }

  @Get()
  findAllPublished() {
    return this.jobsService.findAllPublished();
  }

  @Get('filter')
  searchJobs(@Query('search') search: string) {
    return this.jobsService.searchJobs(search);
  }

  @Delete('my-vacancies/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.RECRUITER, Role.ENTERPRISE])
  deleteVacancy(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return this.jobsService.deleteVacancy(id, userId);
  }

  @Patch('my-vacancies/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.RECRUITER, Role.ENTERPRISE])
  updateVacancy(
    @Body() data: UpdateJobDto,
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return this.jobsService.updateVacancy(data, id, userId);
  }
}
