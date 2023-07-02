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
import { UserType } from 'src/user-type';
@Controller('tipo-atividade')
export class TipoAtividadeController {
  constructor(private readonly tipoAtividadeService: TipoAtividadeService) {}
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get(':codigo')
  async getAtividadesByCurso(@Param('codigo') codigo) {
    return this.tipoAtividadeService.findAtividadesByCurso(codigo);
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('curso/:codigo/tipo-carga/:tipo')
  async getCalculateHoursAlunoByMatricula(
    @Param('codigo') codigo,
    @Param('tipo') tipo,
  ) {
    return this.tipoAtividadeService.findAtividadesByCursoByTipo(codigo, tipo);
  }
}
