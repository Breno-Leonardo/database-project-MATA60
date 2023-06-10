import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacaoAproveitamentoEntity } from './entities/solicitacao_aproveitamento.entity';
import { SolicitacaoAproveitamentoController } from './solicitacao_aproveitamento.controller';
import { SolicitacaoAproveitamentoService } from './solicitacao_aproveitamento.service';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitacaoAproveitamentoEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_TIME_EXPIRES },
      }),
    }),
  ],
  controllers: [SolicitacaoAproveitamentoController],
  providers: [SolicitacaoAproveitamentoService],
})
export class SolicitacaoAproveitamentoModule {}
