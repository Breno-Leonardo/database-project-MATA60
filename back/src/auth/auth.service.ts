import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { AlunoService } from 'src/aluno/aluno.service';
import { CoordenadorService } from 'src/coordenador/coordenador.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly collaboratorService: AlunoService,
    private readonly coordenadorService: CoordenadorService,
    private jwtService: JwtService,
  ) {}
}
