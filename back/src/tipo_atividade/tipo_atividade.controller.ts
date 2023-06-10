import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Headers,
  Param,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { TipoAtividadeService } from './tipo_atividade.service';
@Controller('tipo-atividade')
export class TipoAtividadeController {
  constructor(private readonly tipoAtividadeService: TipoAtividadeService) {}

  @Get(':codigo')
  async getAtividadesByCurso(@Param('codigo') codigo) {
    return this.tipoAtividadeService.findAtividadesByCurso(codigo);
  }

  @Get('curso/:codigo/tipo-carga/:tipo')
  async getCalculateHoursAlunoByMatricula(
    @Param('codigo') codigo,
    @Param('tipo') tipo,
  ) {
    return this.tipoAtividadeService.findAtividadesByCursoByTipo(codigo, tipo);
  }
}
