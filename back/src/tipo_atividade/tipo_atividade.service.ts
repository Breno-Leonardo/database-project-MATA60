import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAtividadeEntity } from './entities/tipo_atividade.entity';

@Injectable()
export class TipoAtividadeService {
  constructor(
    @InjectRepository(TipoAtividadeEntity)
    private readonly tipoAtividadeRepository: Repository<TipoAtividadeEntity>,
    private jwtService: JwtService,
  ) {}

  async findAtividadesByCurso(codigo: number): Promise<TipoAtividadeEntity> {
    const atividades = await this.tipoAtividadeRepository.query(
      `SELECT id, nome, tipo_carga_horaria, limite_horas, horas FROM
      tipo_atividade WHERE codigo_curso=${codigo};
      `,
    );

    if (!atividades) {
      throw new NotFoundException(`Sem tipos para o curso ${codigo} `);
    }
    return atividades;
  }

  async findAtividadesByCursoByTipo(
    codigo: number,
    tipo: string,
  ): Promise<TipoAtividadeEntity> {
    const atividades = await this.tipoAtividadeRepository.query(
      `SELECT id, nome, tipo_carga_horaria, limite_horas, horas FROM
      tipo_atividade WHERE codigo_curso=${codigo} AND tipo_carga_horaria='${tipo}';
      `,
    );

    if (!atividades) {
      throw new NotFoundException(
        `Sem tipos para o curso ${codigo} e tipo ${tipo}`,
      );
    }
    return atividades;
  }
}
