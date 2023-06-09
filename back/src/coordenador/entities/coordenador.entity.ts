import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'coordenador' })
export class CoordenadorEntity {
  @PrimaryColumn({ name: 'matricula_siape' })
  matricula_siape: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'sobrenome', nullable: false })
  sobrenome: string;

  @Column({ name: 'hash_senha', nullable: false })
  hash_senha: string;

  @Column({ name: 'email', nullable: false })
  email: string;
}
