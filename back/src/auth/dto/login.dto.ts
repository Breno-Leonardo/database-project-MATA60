import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  matricula: string;
  @IsString()
  senha: string;
}
