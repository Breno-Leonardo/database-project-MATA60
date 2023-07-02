import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Headers,
} from '@nestjs/common';
import { Param, Put } from '@nestjs/common/decorators';

import { Roles } from 'src/decorators/roles.decorator';

import { SolicitacaoAproveitamentoService } from './solicitacao_aproveitamento.service';
import { UserType } from 'src/user-type';
@Controller('solicitacao-aproveitamento')
export class SolicitacaoAproveitamentoController {
  constructor(
    private readonly solicitacaoAproveitamentoService: SolicitacaoAproveitamentoService,
  ) {}
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('coordenador/:matricula_siape')
  async getSolicitacoesCoordenador(@Param('matricula_siape') matricula) {
    return this.solicitacaoAproveitamentoService.findSolicitacoesByCoordenador(
      matricula,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('coordenador/:matricula_siape/:situacao')
  async getSolicitacoesCoordenadorSituacao(
    @Param('matricula_siape') matricula,
    @Param('situacao') situacao,
  ) {
    return this.solicitacaoAproveitamentoService.findSolicitacoesByCoordenadorBySituacao(
      matricula,
      situacao,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('aluno/:matricula')
  async getSolicitacoesAluno(@Param('matricula') matricula) {
    return this.solicitacaoAproveitamentoService.findSolicitacoesByAluno(
      matricula,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('aluno/:matricula/:situacao')
  async getSolicitacoesAlunoSituacao(
    @Param('matricula') matricula,
    @Param('situacao') situacao,
  ) {
    return this.solicitacaoAproveitamentoService.findSolicitacoesByAlunoBySituacao(
      matricula,
      situacao,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get(':id')
  async getSolicitacaoByID(@Param('id') id) {
    return this.solicitacaoAproveitamentoService.findSolicitacaoByID(id);
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('calcular-horas/:matricula')
  async getCalculateHoursAlunoByMatricula(@Param('matricula') matricula) {
    return this.solicitacaoAproveitamentoService.calculateHoursAlunoByMatricula(
      matricula,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('calcular-horas-extensao-faltantes/:matricula')
  async getCalculateExtensionHoursAlunoByMatricula(
    @Param('matricula') matricula,
  ) {
    return this.solicitacaoAproveitamentoService.calculateMissingExtensionHoursAlunoByMatricula(
      matricula,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('calcular-horas-gerais-faltantes/:matricula')
  async getCalculateGeneralHoursAlunoByMatricula(
    @Param('matricula') matricula,
  ) {
    return this.solicitacaoAproveitamentoService.calculateMissingGeneralHoursAlunoByMatricula(
      matricula,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('total-tipo/:tipo/aluno/:matricula')
  async getTotalHoursByTipo(
    @Param('matricula') matricula,
    @Param('tipo') tipo,
  ) {
    return this.solicitacaoAproveitamentoService.findTotalHoursByTipo(
      matricula,
      tipo,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('atividades/horas-restantes/:matricula')
  async getTotalRestanteByAtividade(@Param('matricula') matricula) {
    return this.solicitacaoAproveitamentoService.calculateHoursType(matricula);
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Post('criar')
  async postSolicitacao(@Body() body: any) {
    return this.solicitacaoAproveitamentoService.createSolicitacao(body);
  }
}
