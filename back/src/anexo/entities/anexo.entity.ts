import { SolicitacaoAproveitamentoEntity } from 'src/solicitacao_aproveitamento/entities/solicitacao_aproveitamento.entity';

import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'solicitacao_decimo_terceiro' })
export class AnexoEntity {
  @PrimaryColumn({ name: 'num' })
  num: number;

  @CreateDateColumn({
    name: 'data_da_solicitacao',
    nullable: false,
    type: 'date',
  })
  dataSolicitacao: Date;

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
  @PrimaryColumn()
  solicitacao_id: SolicitacaoAproveitamentoEntity;
}
