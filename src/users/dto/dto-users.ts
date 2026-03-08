import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário que será cadastrado no sistema.',
    example: 'Fulano Silva Pereira',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Endereço de e-mail único utilizado para autenticação do usuário.',
    example: 'fulano@email.com',
  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsString()
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @ApiProperty({
    description:
      'Senha de acesso do usuário. Deve conter no mínimo 8 caracteres.',
    example: 'Senha@123',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}
