import { CursoEntity } from 'src/curso/entities/curso.entity';
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity({ name: 'tipo_atividade' })
export class TipoAtividadeEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'nome', type: 'character', nullable: false })
  tipo_carga_horaria: string;

  @Column({ name: 'limite_horas', nullable: false })
  limite_horas: number;

  @Column({ name: 'horas', nullable: true })
  horas: number;

  @ManyToOne(() => CursoEntity, (curso) => curso.codigo, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'codigo_curso', referencedColumnName: 'codigo' })
  codigo_curso: CursoEntity;
}
