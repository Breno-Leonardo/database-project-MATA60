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
@Controller('solicitacao-aproveitamento')
export class SolicitacaoAproveitamentoController {
  constructor(
    private readonly solicitacaoAproveitamentoService: SolicitacaoAproveitamentoService,
  ) {}

  @Get('coordenador/:matricula_siape')
  async getSolicitacoesCoordenador(@Param('matricula_siape') matricula) {
    return this.solicitacaoAproveitamentoService.findSolicitacoesByCoordenador(
      matricula,
    );
  }

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

  @Get('aluno/:matricula')
  async getSolicitacoesAluno(@Param('matricula') matricula) {
    return this.solicitacaoAproveitamentoService.findSolicitacoesByAluno(
      matricula,
    );
  }

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

  @Get(':id')
  async getSolicitacaoByID(@Param('id') id) {
    return this.solicitacaoAproveitamentoService.findSolicitacaoByID(id);
  }

  @Get('calcular-horas/:matricula')
  async getCalculateHoursAlunoByMatricula(@Param('matricula') matricula) {
    return this.solicitacaoAproveitamentoService.calculateHoursAlunoByMatricula(
      matricula,
    );
  }

  @Get('calcular-horas-extensao-faltantes/:matricula')
  async getCalculateExtensionHoursAlunoByMatricula(
    @Param('matricula') matricula,
  ) {
    return this.solicitacaoAproveitamentoService.calculateMissingExtensionHoursAlunoByMatricula(
      matricula,
    );
  }

  @Get('calcular-horas-gerais-faltantes/:matricula')
  async getCalculateGeneralHoursAlunoByMatricula(
    @Param('matricula') matricula,
  ) {
    return this.solicitacaoAproveitamentoService.calculateMissingGeneralHoursAlunoByMatricula(
      matricula,
    );
  }

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
}
