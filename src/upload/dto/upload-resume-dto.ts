import { ApiProperty } from '@nestjs/swagger';

export class UploadResumeDto {
  @ApiProperty({
    description: 'Arquivo de currículo em formato PDF',
    type: 'string',
    format: 'binary',
  })
  file: any;
}
