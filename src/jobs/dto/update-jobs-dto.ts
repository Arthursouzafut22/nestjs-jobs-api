import { PartialType } from '@nestjs/mapped-types';
import { JobsDto } from './create-jobs-dto';

export class UpdateJobDto extends PartialType(JobsDto) {}
