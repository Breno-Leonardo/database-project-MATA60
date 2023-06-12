import { AlunoEntity } from 'src/aluno/entities/aluno.entity';
import { CoordenadorEntity } from 'src/coordenador/entities/coordenador.entity';
import { SupervisorEntity } from 'src/supervisor/entities/supervisor.entity';
import { TipoAtividadeEntity } from 'src/tipo_atividade/entities/tipo_atividade.entity';

import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'solicitacao_ferias' })
export class SolicitacaoAproveitamentoEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'resposta_coordenador', nullable: false })
  resposta: string;

  @CreateDateColumn({
    name: 'data_da_solicitacao',
    nullable: false,
    type: 'date',
  })
  dataSolicitacao: Date;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @Column({ name: 'situacao', nullable: false })
  situacao: string;

  @Column({ name: 'carga_real', nullable: false })
  carga_real: number;

  @Column({ name: 'carga_aproveitada', nullable: false })
  carga_aproveitada: number;

  @Column({ name: 'nome_supevisor', nullable: false })
  nome_supevisor: string;

  @Column({ name: 'tel_supevisor', nullable: false })
  tel_supevisor: string;

  @Column({ name: 'email_supevisor', nullable: false })
  email_supevisor: string;

  @ManyToOne(() => TipoAtividadeEntity, (tipo_atividade) => tipo_atividade.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tipo_atividade', referencedColumnName: 'id' })
  id_tipo: TipoAtividadeEntity;

  @ManyToOne(() => AlunoEntity, (aluno) => aluno.matricula, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'matricula_aluno', referencedColumnName: 'matricula' })
  matricula_aluno: AlunoEntity;

  @ManyToOne(
    () => CoordenadorEntity,
    (coordenador) => coordenador.matricula_siape,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'matricula_siape',
    referencedColumnName: 'matricula_siape',
  })
  matricula_coordenador: CoordenadorEntity;

  @OneToOne(() => SupervisorEntity, (supervisor) => supervisor.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_supervisor',
    referencedColumnName: 'id',
  })
  supervisor: SupervisorEntity;
}
