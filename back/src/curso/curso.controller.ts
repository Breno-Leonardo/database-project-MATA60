import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Roles } from 'src/decorators/roles.decorator';
import { CursoService } from './curso.service';
import { UserType } from 'src/user-type';
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get(':codigo')
  async getCurso(@Param('codigo') id) {
    return this.cursoService.findCurso(id);
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('horas-extensao/:codigo')
  async getTotalHorasExtensaoByCurso(@Param('codigo') id) {
    return this.cursoService.findTotalHorasExtensaoByCurso(id);
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('horas-gerais/:codigo')
  async getTotalHorasGeraisByCurso(@Param('codigo') id) {
    return this.cursoService.findTotalHorasGeraisByCurso(id);
  }
}
