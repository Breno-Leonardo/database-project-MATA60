import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { SupervisorEntity } from './entities/supervisor.entity';

@Injectable()
export class SupervisorService {
  constructor(
    @InjectRepository(SupervisorEntity)
    private readonly supervisorRepository: Repository<SupervisorEntity>,
  ) {}
}
