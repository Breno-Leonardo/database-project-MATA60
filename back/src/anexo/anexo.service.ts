import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnexoEntity } from './entities/anexo.entity';

@Injectable()
export class AnexoService {
  constructor(
    @InjectRepository(AnexoEntity)
    private readonly anexoRepository: Repository<AnexoEntity>,
    private jwtService: JwtService,
  ) {}

  async findAnexosBySolicitacaoByID(id: number): Promise<AnexoEntity> {
    const anexos = await this.anexoRepository.query(
      `SELECT * FROM anexo WHERE solicitacao_id=${id};
      `,
    );

    if (!anexos) {
      throw new NotFoundException(`Anexos da solicitacao ${id} not found`);
    }
    return anexos;
  }
}
