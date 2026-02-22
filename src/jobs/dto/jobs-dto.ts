import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class JobsDto {
  @IsNotEmpty()
  @IsString()
  targetaFeaturedJob: string;

  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  enterprise: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  modality: string;

  @IsNotEmpty()
  @IsString()
  wage: string;

  @IsNotEmpty()
  @IsString()
  typeOfContract: string;

  @IsNotEmpty()
  @IsString()
  workShift: string;

  @IsNotEmpty()
  workSchedule: string;

  @IsNotEmpty()
  @IsString()
  daysWorkedPerWeek: string;

  @IsNotEmpty()
  @IsString()
  workTime: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @IsArray()
  @IsString({ each: true })
  differences: string[];

  @IsArray()
  @IsString({ each: true })
  activities: string[];

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsString()
  descriptionVacancy: string;

  @IsArray()
  benefits: string[];
}
