import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { AlunoEntity } from './entities/aluno.entity';
import * as bcrypt from 'bcrypt';
import { SolicitacaoAproveitamentoEntity } from 'src/solicitacao_aproveitamento/entities/solicitacao_aproveitamento.entity';

const saltOrRounds = 10;

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
  ) {}

  async findAlunoByMatricula(matricula: number): Promise<AlunoEntity> {
    const aluno = await this.alunoRepository.query(
      `Select * from aluno where matricula =${matricula}`,
    );
    if (!aluno) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return aluno[0];
  }
  async findAlunoByMatriculaWithoutHash(
    matricula: number,
  ): Promise<AlunoEntity> {
    const aluno = await this.alunoRepository.query(
      `Select matricula,cpf, telefone, nome, email,codigo_curso from aluno where matricula =${matricula}`,
    );
    if (!aluno) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return aluno[0];
  }

  async getAllAlunos(): Promise<AlunoEntity[]> {
    return await this.alunoRepository.query('Select * from aluno');
  }
}
