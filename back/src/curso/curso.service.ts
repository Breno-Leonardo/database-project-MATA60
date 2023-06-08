import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CursoEntity } from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly teamRepository: Repository<CursoEntity>,
  ) {}
}
