import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly email: MailerService) {}

  async sendApplicationConfirmation(email: string, vacancyTitle: string) {
    await this.email.sendMail({
      to: email,
      subject: 'Confirmação de candidatura',
      text: `Você se candidatou para a vaga ${vacancyTitle}. Boa sorte!`,
    });
  }
}
