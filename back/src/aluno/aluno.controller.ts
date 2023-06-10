import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from '../user-type';
import { Delete, Put } from '@nestjs/common/decorators';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('lista-alunos/:matricula')
  async getCollaboratorByRegistration(@Param('matricula') matricula) {
    return this.alunoService.findAlunoByMatricula(matricula);
  }

  @Get('lista-alunos')
  async getAllAlunos() {
    return this.alunoService.getAllAlunos();
  }
}
