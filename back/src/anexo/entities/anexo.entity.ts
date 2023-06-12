import { SolicitacaoAproveitamentoEntity } from 'src/solicitacao_aproveitamento/entities/solicitacao_aproveitamento.entity';

import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'anexo' })
export class AnexoEntity {
  @PrimaryColumn({ name: 'num' })
  num: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'extensao', nullable: false })
  extensao: string;

  @Column({ name: 'caminho', nullable: false })
  caminho: string;

  @ManyToOne(
    () => SolicitacaoAproveitamentoEntity,
    (solicitacao) => solicitacao.id,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'solicitacao_id',
    referencedColumnName: 'id',
  })
  @PrimaryColumn({ name: 'solicitacao_id' })
  solicitacao_id: SolicitacaoAproveitamentoEntity;
}
