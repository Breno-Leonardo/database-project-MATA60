import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitacaoAproveitamentoEntity } from './entities/solicitacao_aproveitamento.entity';
import { AlunoService } from 'src/aluno/aluno.service';

@Injectable()
export class SolicitacaoAproveitamentoService {
  constructor(
    @InjectRepository(SolicitacaoAproveitamentoEntity)
    private readonly solicitacaoAproveitamentoRepository: Repository<SolicitacaoAproveitamentoEntity>,
    private jwtService: JwtService,
    private readonly alunoService: AlunoService,
  ) {}
}
