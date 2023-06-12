import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Delete, Put } from '@nestjs/common/decorators';
import { UserType } from 'src/user-type';

@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}
}
