import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoEntity } from './entities/aluno.entity';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { SolicitacaoAproveitamentoModule } from 'src/solicitacao_aproveitamento/solicitacao_aproveitamento.module';
import { SolicitacaoAproveitamentoEntity } from 'src/solicitacao_aproveitamento/entities/solicitacao_aproveitamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoEntity])],
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: [AlunoService],
})
export class AlunoModule {}
