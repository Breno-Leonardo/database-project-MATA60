import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialDataChanges1678662502089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    UPDATE  coordenador SET hash_senha= '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m';

UPDATE  aluno SET hash_senha= '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m';
        
UPDATE  tipo_atividade SET nome= 'Atividade X';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
