export class UploadDto {
  fieldname: string;
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
