import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAtividadeEntity } from './entities/tipo_atividade.entity';

@Injectable()
export class TipoAtividadeService {
  constructor(
    @InjectRepository(TipoAtividadeEntity)
    private readonly thirteenthRequestRepository: Repository<TipoAtividadeEntity>,
    private jwtService: JwtService,
  ) {}
}
