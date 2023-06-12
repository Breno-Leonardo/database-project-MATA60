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
    private readonly coordenadorRepository: Repository<CoordenadorEntity>,
  ) {}
  async findCoordenadorByMatricula(
    matricula_siape: number,
  ): Promise<CoordenadorEntity> {
    const coordenador = await this.coordenadorRepository.query(
      `Select * from Coordenador where matricula_siape=${matricula_siape}`,
    );
    if (!coordenador) {
      throw new NotFoundException(`Coordenador: ${matricula_siape} not found`);
    }
    return coordenador[0];
  }

  async findCoordenadorByMatriculaWithoutHash(
    matricula_siape: number,
  ): Promise<CoordenadorEntity> {
    const coordenador = await this.coordenadorRepository.query(
      `Select nome, email from Coordenador where matricula_siape=${matricula_siape}`,
    );
    if (!coordenador) {
      throw new NotFoundException(`Coordenador: ${matricula_siape} not found`);
    }
    return coordenador[0];
  }
}
