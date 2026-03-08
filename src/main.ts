import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Jobs API')
    .setDescription(
      'API REST para uma plataforma de publicação de vagas de emprego. ' +
        'Permite cadastro e autenticação de usuários, criação e gerenciamento de vagas, ' +
        'além de candidatura em vagas com envio de currículo em formato PDF.',
    )
    .setVersion('1.0')
    .addTag('Auth', 'Autenticação de usuários')
    .addTag('Users', 'Gerenciamento de usuários')
    .addTag('Jobs', 'Publicação e gerenciamento de vagas')
    .addTag('Upload', 'Candidatura em vagas com envio de currículo (PDF)')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
