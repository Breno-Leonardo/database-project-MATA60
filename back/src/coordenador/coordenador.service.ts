import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CoordenadorEntity } from './entities/coordenador.entity';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class CoordenadorService {
  constructor(
    @InjectRepository(CoordenadorEntity)
    private readonly collaboratorRepository: Repository<CoordenadorEntity>,
  ) {}
}
