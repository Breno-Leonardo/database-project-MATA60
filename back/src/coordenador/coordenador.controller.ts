import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { CoordenadorService } from './coordenador.service';
import { Roles } from 'src/decorators/roles.decorator';
import { CollaboratorType } from './enum/collaborator-type';
import { Delete, Put } from '@nestjs/common/decorators';

@Controller('coordenador')
export class CoordenadorController {
  constructor(private readonly coordenadorService: CoordenadorService) {}
}
