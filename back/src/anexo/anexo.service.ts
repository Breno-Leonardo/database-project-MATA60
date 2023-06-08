import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnexoEntity } from './entities/anexo.entity';

@Injectable()
export class AnexoService {
  constructor(
    @InjectRepository(AnexoEntity)
    private readonly thirteenthRequestRepository: Repository<AnexoEntity>,
    private jwtService: JwtService,
  ) {}
}
