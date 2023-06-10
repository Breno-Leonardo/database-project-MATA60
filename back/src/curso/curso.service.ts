import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CursoEntity } from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,
  ) {}

  async findTotalHorasGeraisByCurso(codigo: number): Promise<CursoEntity> {
    const horas = await this.cursoRepository.query(
      `SELECT horas_gerais FROM curso WHERE codigo=${codigo};
      `,
    );

    if (!horas) {
      throw new NotFoundException(`Curso ${codigo} not found`);
    }
    return horas;
  }

  async findTotalHorasExtensaoByCurso(codigo: number): Promise<CursoEntity> {
    const horas = await this.cursoRepository.query(
      `SELECT horas_extensao FROM curso WHERE codigo=${codigo};
      `,
    );

    if (!horas) {
      throw new NotFoundException(`Curso ${codigo} not found`);
    }
    return horas;
  }
}
