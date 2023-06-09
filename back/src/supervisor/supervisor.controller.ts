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
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get(':email/:nome/:sobrenome/:telefone')
  async getSupervisor(
    @Param('email') email,
    @Param('nome') nome,
    @Param('sobrenome') sobrenome,
    @Param('telefone') telefone,
  ) {
    return this.supervisorService.findSupervisor(
      email,
      nome,
      sobrenome,
      telefone,
    );
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get('id/:id')
  async getSupervisorById(@Param('id') idSupervisor) {
    return this.supervisorService.findSupervisorByID(idSupervisor);
  }
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Post('criar')
  async postSolicitacao(@Body() body: any) {
    return this.supervisorService.createSupervisor(body);
  }
}
