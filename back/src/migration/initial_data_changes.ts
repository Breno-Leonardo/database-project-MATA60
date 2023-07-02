import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialDataChanges1678662502089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    UPDATE  coordenador SET hash_senha= '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m';

UPDATE  aluno SET hash_senha= '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m';
        
    update  tipo_atividade set nome= 'Atividade A' where id%10=0;
    update  tipo_atividade set nome= 'Atividade B' where id%10=1;
    update  tipo_atividade set nome= 'Atividade C' where id%10=2;
    update  tipo_atividade set nome= 'Atividade D' where id%10=3;
    update  tipo_atividade set nome= 'Atividade E' where id%10=4;
    update  tipo_atividade set nome= 'Atividade F' where id%10=5;
    update  tipo_atividade set nome= 'Atividade G' where id%10=6;
    update  tipo_atividade set nome= 'Atividade H' where id%10=7;
    update  tipo_atividade set nome= 'Atividade I' where id%10=8;
    update  tipo_atividade set nome= 'Atividade J' where id%10=9;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
