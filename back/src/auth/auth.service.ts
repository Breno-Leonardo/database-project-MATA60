import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { AlunoService } from 'src/aluno/aluno.service';
import { CoordenadorService } from 'src/coordenador/coordenador.service';
import { AlunoEntity } from 'src/aluno/entities/aluno.entity';
import { UserType } from 'src/user-type';
import { CoordenadorEntity } from 'src/coordenador/entities/coordenador.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly alunoService: AlunoService,
    private readonly coordenadorService: CoordenadorService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    let typeUser = 0;

    const coordenador: CoordenadorEntity | undefined =
      await this.coordenadorService
        .findCoordenadorByMatricula(loginDto.matricula)
        .catch(() => undefined);

    if (coordenador) {
      typeUser = UserType.Coordenador;
      const isMatch = await compare(
        loginDto.senha,
        coordenador?.hash_senha?.trim() || '',
      );
      if (!coordenador || !isMatch) {
        throw new NotFoundException(`Matricula ou senha invalida`);
      }
      return {
        matricula: coordenador.matricula_siape,
        nome: coordenador.nome,
        typeUser: typeUser,

        acessToken: this.jwtService.sign({
          ...{
            matricula: coordenador.matricula_siape,
            nome: coordenador.nome,
            typeUser: typeUser,
          },
        }),
      };
    } else {
      const aluno: AlunoEntity | undefined = await this.alunoService
        .findAlunoByMatricula(loginDto.matricula)
        .catch(() => undefined);

      if (aluno) {
        typeUser = UserType.Aluno;
      }

      const isMatch = await compare(
        loginDto.senha,
        aluno?.hash_senha.trim() || '',
      );
      if (!aluno || !isMatch) {
        throw new NotFoundException(`Matricula ou senha invalida`);
      }
      return {
        matricula: aluno.matricula,
        nome: aluno.nome,
        typeUser: typeUser,

        acessToken: this.jwtService.sign({
          ...{
            matricula: aluno.matricula,
            nome: aluno.nome,
            typeUser: typeUser,
          },
        }),
      };
    }
  }

  async checkToken(token: string): Promise<any> {
    const decode: any = this.jwtService.decode(token);
    if (decode.typeUser == UserType.Aluno) {
      let alunoReturn = await this.alunoService
        .findAlunoByMatricula(decode.matricula)
        .catch(() => undefined);
      alunoReturn = {
        matricula: alunoReturn.matricula,
        nome: alunoReturn.nome,
        typeUser: decode.typeUser,
      };
      return alunoReturn;
    } else if (decode.typeUser == UserType.Coordenador) {
      let coordenadorReturn = await this.coordenadorService
        .findCoordenadorByMatricula(decode.matricula)
        .catch(() => undefined);
      coordenadorReturn = {
        matricula: coordenadorReturn.matricula_siape,
        nome: coordenadorReturn.nome,
        typeUser: decode.typeUser,
      };
      return coordenadorReturn;
    }
    return decode;
  }
}
