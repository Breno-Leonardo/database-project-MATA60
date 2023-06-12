import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Headers } from '@nestjs/common/decorators';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { AlunoEntity } from 'src/aluno/entities/aluno.entity';
import { AlunoService } from 'src/aluno/aluno.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserType } from 'src/user-type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    //const p = await hash('123', 10);
    //console.log(p);
    return await this.authService.login(loginDto);
  }

  @Get('check')
  async check(@Headers() headers): Promise<void> {
    return await this.authService.checkToken(headers.authorization);
  }
}
