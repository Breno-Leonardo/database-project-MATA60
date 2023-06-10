import { IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNumber()
  matricula: number;

  @IsString()
  senha: string;
}
