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
import { UserType } from 'src/user-type';
import { Roles } from 'src/decorators/roles.decorator';
import { AnexoService } from './anexo.service';
@Controller('anexo')
export class AnexoController {
  constructor(private readonly anexoService: AnexoService) {}

  @Get(':id')
  async getAnexosBySolicitacaoByID(@Param('id') id) {
    return this.anexoService.findAnexosBySolicitacaoByID(id);
  }
}
