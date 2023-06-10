import { MigrationInterface, QueryRunner } from 'typeorm';

//Uma query inicial para alimentar com os dados do gestor que não tem gestor e criar o primeiro time que seria o time de gestores liderado por esse gestor

export class initialData1678664119697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    -- Inserções na tabela 'coordenador'
    INSERT INTO coordenador (matricula_siape, nome, hash_senha, email)
    VALUES (123456, 'João Silva',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    'joao.silva@ufba.br'),
    (987654, 'Maria Santos',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    'maria.santos@ufba.br'),
    (543210, 'Pedro Souza',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    'pedro.souza@ufba.br'),
    (111111, 'Ana Oliveira',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    'ana.oliveira@ufba.br'),
    (222222, 'Carlos Rodrigues',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    'carlos.rodrigues@ufba.br');
    -- Inserções na tabela 'curso'
    INSERT INTO curso (codigo, nome, horas_extensao, horas_gerais,
    matricula_coordenador)
    VALUES (1, 'Ciência da Computação', 200, 150, 123456),
    (2, 'Engenharia Civil', 180, 120, 987654),
    (3, 'Administração', 160, 100, 543210),
    (4, 'Medicina', 250, 200, NULL),
    (5, 'Psicologia', 220, 180, 222222);
    -- Inserções na tabela 'aluno'
    INSERT INTO aluno (matricula, cpf, telefone, nome, email, hash_senha,
    codigo_curso)
    VALUES (20210001, '12345678901', '71 98765-4321', 'Lucas Santos',
    'lucas.santos@ufba.br',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    1),
    (20210002, '98765432109', '71 12345-6789', 'Ana Silva',
    'ana.silva@ufba.br',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    2),
    (20210003, '54321098765', NULL, 'Pedro Oliveira',
    'pedro.oliveira@ufba.br',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    1),
    (20210004, '11111111111', '75 11111-1111', 'Mariana Souza',
    'mariana.souza@ufba.br',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    3),
    (20210005, '22222222222', '71 22222-2222', 'Julia Rodrigues',
    'julia.rodrigues@ufba.br',
    '$2b$10$4lWiIhIeBZtSbKa5pI07xetNfkftFwT.ZfB2ahbVGeL4jJoLq9s1m',
    4);
    -- Inserções na tabela 'tipo_atividade'
    INSERT INTO tipo_atividade (id, nome, tipo_carga_horaria,
    limite_horas, horas, codigo_curso)
    VALUES (1, 'Ensino - Monitoria', 'G', 30, 20, 1),
    (2, 'Pesquisa - Apresentação de trabalhos', 'G', 30, 10, 1),
    (3, 'Pesquisa - Participação em projetos de iniciação
    científica', 'G', 30, 20, 1),
    (4, 'Ensino - Monitoria', 'G', 30, 20, 1),
    (5, 'Formação Interdisciplinar - Cursos de Idiomas presenciais
    ou à distância nível intermediário em diante', 'G', 30, 30, 1),
    (6, 'Pesquisa - Participação em atividades físicas', 'G', 20,
    5, 1),
    (7, 'Pesquisa - Apresentação de trabalhos', 'G', 30, 10, 2),
    (8, 'Pesquisa - Participação em projetos de iniciação
    científica', 'G', 30, 20, 3),
    (9, 'Ensino - Monitoria', 'G', 30, 20, 4),
    (10, 'Formação Interdisciplinar - Cursos de Idiomas
    presenciais ou à distância nível intermediário em diante', 'G', 30,
    30, 5),
    (11, 'Extensão - Projeto de extensão', 'E', 120, 60, 1),
    (12, 'Extensão - Evento acadêmico-científico', 'E', 100, 50,
    1);
    -- Inserções na tabela 'solicitacao_aproveitamento'
    INSERT INTO solicitacao_aproveitamento (id, descricao, situacao,
    carga_real, carga_aproveitada, nome_supervisor, tel_supervisor,
    email_supervisor, matricula_aluno, matricula_coordenador, id_tipo)
    VALUES (1, 'Solicitação 1', 'Pendente', 40, NULL, 'Supervisor 1', '71
    98765-4321', 'supervisor1@ufba.br', 20210001, 123456, 1),
    (2, 'Solicitação 2', 'Aprovada', 30, 25, 'Supervisor 2', '75
    123456789', 'supervisor2@ufba.br', 20210002, 987654, 3),
    (3, 'Solicitação 3', 'Reprovada', 20, NULL, 'Supervisor 3',
    '71 54321-0987', 'supervisor3@ufba.br', 20210003, NULL, 2),
    (4, 'Solicitação 4', 'Pendente', 35, NULL, 'Supervisor 4', '71
    11111-1111', 'supervisor4@ufba.br', 20210004, 111111, 4),
    (5, 'Solicitação 5', 'Aprovada', 30, 30, 'Supervisor 5', '71
    22222-2222', 'supervisor5@ufba.br', 20210005, 222222, 5);
    -- Inserções na tabela 'anexo'
    INSERT INTO anexo (num, solicitacao_id, nome, extensao, caminho)
    VALUES (1, 1, 'Anexo 1', 'pdf', '/path/do/arquivo1/'),
    (2, 3, 'Anexo 2', 'docx', '/path/do/arquivo2/'),
    (3, 1, 'Anexo 3', 'jpg', '/path/do/arquivo3/'),
    (4, 2, 'Anexo 4', 'pdf', '/path/do/arquivo4/'),
    (5, 4, 'Anexo 5', 'docx', '/path/do/arquivo5/');
    
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
