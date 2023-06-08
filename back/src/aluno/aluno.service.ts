import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { AlunoEntity } from './entities/aluno.entity';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
  ) {}

  async findAlunoByMatricula(matricula: string): Promise<AlunoEntity> {
    const aluno = await this.alunoRepository.findOne({
      relations: ['curso'],
      where: { matricula },
    });
    if (!aluno) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return aluno;
  }
}
