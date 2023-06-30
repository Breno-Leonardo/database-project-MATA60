import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1678662502071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`

    CREATE TABLE coordenador
(
 matricula_siape            integer PRIMARY KEY,
 nome                       varchar(255) NOT NULL,
 sobrenome		            varchar(255) NOT NULL,
 hash_senha                 char(64) NOT NULL,
 email                      varchar(255) UNIQUE NOT NULL
);

CREATE TABLE curso
(
 codigo 			    	integer PRIMARY KEY,
 nome                     	varchar(255) NOT NULL,
 horas_extensao          	integer NOT NULL,
 horas_gerais  		    	integer NOT NULL,
 matricula_coordenador  	integer NULL REFERENCES coordenador(matricula_siape)
);

CREATE TABLE aluno (
 matricula   	            integer PRIMARY KEY,
 cpf           	            char(11) UNIQUE NOT NULL,
 telefone               	varchar(20),
 nome                   	varchar(255) NOT NULL,
 sobrenome		            varchar(255) NOT NULL,
 email        	            varchar(255) UNIQUE NOT NULL,
 hash_senha	                char(64) NOT NULL,
 codigo_curso	            integer NOT NULL REFERENCES curso(codigo)
);

CREATE TABLE tipo_atividade (
 id 				        serial PRIMARY KEY,
 nome 			            varchar(255) NOT NULL,
 tipo_carga_horaria     	char(1) NOT NULL DEFAULT 'G',
 limite_horas 	        	integer NOT NULL,
 horas 		             	integer,
 requer_supervisor          boolean NOT NULL DEFAULT false,
 codigo_curso 	        	integer NOT NULL REFERENCES curso(codigo)
);

CREATE TABLE supervisor
(
 id      			    serial PRIMARY KEY,
 email                  varchar(255) NOT NULL,
 nome                   varchar(255) NOT NULL,
 sobrenome		        varchar(255),
 telefone               varchar(20) NOT NULL
);

CREATE TABLE solicitacao_aproveitamento (
 id					        serial PRIMARY KEY,
 descricao 			        varchar(4000) NOT NULL,
 resposta_coordenador       varchar(4000),
 data_da_solicitacao        date NOT NULL DEFAULT now(),
 situacao 				    varchar(20) NOT NULL,
 carga_real 			    integer NOT NULL,
 carga_aproveitada 		    integer,
 matricula_aluno 		    integer NOT NULL REFERENCES aluno(matricula),
 matricula_coordenador 	    integer REFERENCES coordenador(matricula_siape),
 id_tipo 				    integer NOT NULL REFERENCES tipo_atividade(id),
 id_supervisor			    integer REFERENCES supervisor(id)
);

CREATE TABLE anexo (
 num 				        integer NOT NULL,
 solicitacao_id 	    	integer NOT NULL REFERENCES solicitacao_aproveitamento(id),
 nome                       varchar(255) NOT NULL,
 extensao                   varchar(255) NOT NULL,
 caminho                    varchar(255) NOT NULL,
 PRIMARY KEY (num, solicitacao_id)
);

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    

    `);
  }
}
