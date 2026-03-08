import { IsArray, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JobsDto {
  @ApiProperty({
    description: 'Indica se a vaga é destacada na plataforma.',
    example: 'Vaga Nova',
  })
  @IsNotEmpty()
  @IsString()
  targetaFeaturedJob: string;

  @ApiProperty({
    description: 'Título da vaga anunciada.',
    example: 'Desenvolvedor Backend Node.js',
  })
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @ApiProperty({
    description: 'Nome da empresa que está oferecendo a vaga.',
    example: 'Tech Solutions LTDA',
  })
  @IsNotEmpty()
  @IsString()
  enterprise: string;

  @ApiProperty({
    description: 'Localização da vaga.',
    example: 'Belo Horizonte, MG',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Modalidade de trabalho.',
    example: 'Remoto',
  })
  @IsNotEmpty()
  @IsString()
  modality: string;

  @ApiProperty({
    description: 'Faixa salarial da vaga.',
    example: '6000',
  })
  @IsNotEmpty()
  @IsString()
  wage: string;

  @ApiProperty({
    description: 'Tipo de contrato oferecido.',
    example: 'CLT',
  })
  @IsNotEmpty()
  @IsString()
  typeOfContract: string;

  @ApiProperty({
    description: 'Turno de trabalho.',
    example: 'Diurno',
  })
  @IsNotEmpty()
  @IsString()
  workShift: string;

  @ApiProperty({
    description: 'Horário de trabalho.',
    example: '09:00 às 18:00',
  })
  @IsNotEmpty()
  workSchedule: string;

  @ApiProperty({
    description: 'Quantidade de dias trabalhados por semana.',
    example: '5 dias',
  })
  @IsNotEmpty()
  @IsString()
  daysWorkedPerWeek: string;

  @ApiProperty({
    description: 'Carga horária diária ou semanal.',
    example: '40 horas semanais',
  })
  @IsNotEmpty()
  @IsString()
  workTime: string;

  @ApiProperty({
    description: 'Habilidades técnicas necessárias para a vaga.',
    example: ['Node.js', 'TypeScript', 'PostgreSQL'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({
    description: 'Requisitos obrigatórios para candidatura.',
    example: [
      'Experiência com Node.js',
      'Conhecimento em APIs REST',
      'Experiência com bancos relacionais',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @ApiProperty({
    description: 'Diferenciais desejáveis para o candidato.',
    example: ['Experiência com Docker', 'Conhecimento em AWS'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  differences: string[];

  @ApiProperty({
    description: 'Principais atividades que serão desempenhadas.',
    example: [
      'Desenvolver APIs REST',
      'Manter serviços backend',
      'Participar de code reviews',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  activities: string[];

  @ApiProperty({
    description: 'Nível de escolaridade exigido.',
    example: 'Superior completo',
  })
  @IsNotEmpty()
  @IsString()
  education: string;

  @ApiProperty({
    description: 'Descrição detalhada da vaga.',
    example:
      'Estamos procurando um desenvolvedor backend para atuar no desenvolvimento e manutenção de APIs escaláveis.',
  })
  @IsNotEmpty()
  @IsString()
  descriptionVacancy: string;

  @ApiProperty({
    description: 'Benefícios oferecidos pela empresa.',
    example: ['Vale refeição', 'Plano de saúde', 'Home office'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  benefits: string[];
}
