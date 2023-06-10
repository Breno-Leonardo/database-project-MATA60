import { CursoEntity } from 'src/curso/entities/curso.entity';
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity({ name: 'aluno' })
export class AlunoEntity {
  @PrimaryColumn({ name: 'matricula' })
  matricula: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'hash_senha', nullable: false })
  hash_senha: string;

  @Column({ name: 'telefone' })
  telefone: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @ManyToOne(() => CursoEntity, (curso) => curso.codigo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'codigo_curso', referencedColumnName: 'codigo' })
  codigo_curso: CursoEntity;
}
