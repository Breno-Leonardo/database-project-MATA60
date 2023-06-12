import { CoordenadorEntity } from 'src/coordenador/entities/coordenador.entity';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'curso' })
export class CursoEntity {
  @PrimaryColumn({ name: 'codigo' })
  codigo: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @OneToOne(
    () => CoordenadorEntity,
    (coordenador) => coordenador.matricula_siape,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'coordenador', referencedColumnName: 'matricula_siape' })
  coordenador: CoordenadorEntity;
}
