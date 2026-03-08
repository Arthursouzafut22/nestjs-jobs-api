import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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
import { RolesGuard } from 'src/infra/providers/roles-guard.provider';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadResumeDto } from './dto/upload-resume-dto';

@Controller('curriculum')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload/:vacancyId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadResumeDto })
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('file'))
  uploadCurriculum(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'application/pdf' }),
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
      }),
    )
    file: UploadDto[],
    @User('id', ParseIntPipe) userId: number,
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
  ) {
    return this.uploadService.uploadCurriculum(file, vacancyId, userId);
  }

  @Get('download/:vacancyId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.RECRUITER, Role.ENTERPRISE])
  downloadCurriculum(
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
    @User('id') userId: number,
  ) {
    return this.uploadService.downloadCurriculum(vacancyId, userId);
  }
}
