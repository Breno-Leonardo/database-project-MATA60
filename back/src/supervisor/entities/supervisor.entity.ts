import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'coordenador' })
export class SupervisorEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'sobrenome', nullable: true })
  sobrenome: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'telefone' })
  telefone: string;
}
