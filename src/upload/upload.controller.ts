import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './dto/upload-dto';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

@Controller('curriculum')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload/:vacancyId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('file'))
  uploadCurriculum(
    @UploadedFiles() file: UploadDto[],
    @User('id', ParseIntPipe) userId: number,
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
  ) {
    return this.uploadService.uploadCurriculum(file, vacancyId, userId);
  }

  @Get(':vacancyId/download')
  downloadCurriculum() {}
}
