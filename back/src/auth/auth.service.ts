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
    let typeCollaborator = 0;

    const coordenador: CoordenadorEntity | undefined =
      await this.coordenadorService
        .findCoordenadorByMatricula(loginDto.matricula)
        .catch(() => undefined);
    if (coordenador) {
      typeCollaborator = UserType.Coordenador;
    } else {
      const aluno: AlunoEntity | undefined = await this.alunoService
        .findAlunoByMatricula(loginDto.matricula)
        .catch(() => undefined);

      if (aluno) {
        typeCollaborator = UserType.Aluno;
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
        typeCollaborator: typeCollaborator,

        acessToken: this.jwtService.sign({
          ...{
            matricula: aluno.matricula,
            nome: aluno.nome,
            typeCollaborator: typeCollaborator,
          },
        }),
      };
    }

    return {
      matricula: coordenador.matricula_siape,
      nome: coordenador.nome,
      typeCollaborator: typeCollaborator,

      acessToken: this.jwtService.sign({
        ...{
          matricula: coordenador.matricula_siape,
          nome: coordenador.nome,
          typeCollaborator: typeCollaborator,
        },
      }),
    };
  }
}
