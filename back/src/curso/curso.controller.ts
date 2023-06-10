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
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get('horas-extensao/:codigo')
  async getTotalHorasExtensaoByCurso(@Param('codigo') id) {
    return this.cursoService.findTotalHorasExtensaoByCurso(id);
  }

  @Get('horas-gerais/:codigo')
  async getTotalHorasGeraisByCurso(@Param('codigo') id) {
    return this.cursoService.findTotalHorasGeraisByCurso(id);
  }
}
