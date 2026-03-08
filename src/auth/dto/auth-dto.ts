import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Endereço de e-mail utilizado para autenticação do usuário.',
    example: 'usuario@email.com',
  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @ApiProperty({
    description: 'Senha de acesso do usuário.',
    example: 'Senha@123',
    format: 'password',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString()
  password: string;
}
