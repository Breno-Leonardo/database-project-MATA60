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

  async findSupervisor(email: string): Promise<SupervisorEntity> {
    const supervisor = await this.supervisorRepository.query(
      `SELECT
      id
    FROM
      supervisor
    WHERE
      email='${email}' ;
     `,
    );
    if (!supervisor) {
      throw new NotFoundException(`Supervisor not found`);
    }
    return supervisor[0];
  }

  async findSupervisorByID(id: number): Promise<SupervisorEntity> {
    const supervisor = await this.supervisorRepository.query(
      `select * from supervisor where id=${id};
     `,
    );
    if (!supervisor) {
      throw new NotFoundException(`Supervisor not found`);
    }
    return supervisor[0];
  }

  async createSupervisor(body: any): Promise<SupervisorEntity> {
    return this.supervisorRepository.save({ ...body });
  }
}
