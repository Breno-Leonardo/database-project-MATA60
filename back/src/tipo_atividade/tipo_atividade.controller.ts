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
@Controller('decimo-terceiro')
export class TipoAtividadeController {
  constructor(
    private readonly thirteenthRequestService: TipoAtividadeService,
  ) {}
}
