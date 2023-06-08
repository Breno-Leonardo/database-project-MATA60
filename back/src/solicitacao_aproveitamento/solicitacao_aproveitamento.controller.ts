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
    private readonly vacationRequestService: SolicitacaoAproveitamentoService,
  ) {}
}
