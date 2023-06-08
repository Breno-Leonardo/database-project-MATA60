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
  constructor(private readonly teamService: CursoService) {}
}
