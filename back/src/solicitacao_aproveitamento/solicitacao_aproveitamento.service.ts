import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitacaoAproveitamentoEntity } from './entities/solicitacao_aproveitamento.entity';
import { AlunoService } from 'src/aluno/aluno.service';

@Injectable()
export class SolicitacaoAproveitamentoService {
  constructor(
    @InjectRepository(SolicitacaoAproveitamentoEntity)
    private readonly solicitacaoAproveitamentoRepository: Repository<SolicitacaoAproveitamentoEntity>,
    private jwtService: JwtService,
  ) {}

  async findSolicitacoesByCoordenador(
    matricula_siape: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const solicitacoes = await this.solicitacaoAproveitamentoRepository.query(
      `SELECT S.id, S.situacao, S.data_da_solicitacao, S.descricao, S.carga_real, S.carga_aproveitada, S.resposta_coordenador,S.id_supervisor, T.nome AS "nome_atividade", T.tipo_carga_horaria,T.requer_supervisor,T.horas, T.limite_horas, A.matricula, A.nome, A.sobrenome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE
      C.matricula_coordenador=${matricula_siape} order by S.data_da_solicitacao desc;
      `,
    );

    if (!solicitacoes) {
      throw new NotFoundException(
        `Solicitacoes de ${matricula_siape} not found`,
      );
    }
    return solicitacoes;
  }

  async findSolicitacoesByCoordenadorBySituacao(
    matricula_siape: number,
    situacao: string,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const solicitacoes = await this.solicitacaoAproveitamentoRepository.query(
      `SELECT S.id, S.situacao, S.data_da_solicitacao, S.descricao, S.carga_real, S.carga_aproveitada, S.resposta_coordenador,S.id_supervisor, T.nome AS "nome_atividade", T.tipo_carga_horaria,T.requer_supervisor,T.horas, T.limite_horas, A.matricula, A.nome, A.sobrenome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE
      C.matricula_coordenador=${matricula_siape} AND S.situacao='${situacao}' order by S.data_da_solicitacao desc;
      `,
    );

    if (!solicitacoes) {
      throw new NotFoundException(
        `Solicitacoes de ${matricula_siape} ${situacao} not found`,
      );
    }
    return solicitacoes;
  }

  async findSolicitacoesByAluno(
    matricula: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const solicitacoes = await this.solicitacaoAproveitamentoRepository.query(
      `SELECT S.id, S.situacao, S.data_da_solicitacao, S.descricao, S.carga_real, S.carga_aproveitada, S.resposta_coordenador,S.id_supervisor, T.nome AS "nome_atividade", T.tipo_carga_horaria,T.requer_supervisor,T.horas, T.limite_horas, A.matricula, A.nome, A.sobrenome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE 
      matricula_aluno=${matricula} order by S.data_da_solicitacao desc;
      `,
    );

    if (!solicitacoes) {
      throw new NotFoundException(`Solicitacoes de ${matricula} not found`);
    }
    return solicitacoes;
  }

  async findSolicitacoesByAlunoBySituacao(
    matricula: number,
    situacao: string,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const solicitacoes = await this.solicitacaoAproveitamentoRepository.query(
      `SELECT S.id, S.situacao, S.data_da_solicitacao, S.descricao, S.carga_real, S.carga_aproveitada, S.resposta_coordenador,S.id_supervisor, T.nome AS "nome_atividade", T.tipo_carga_horaria,T.requer_supervisor,T.horas, T.limite_horas, A.matricula, A.nome, A.sobrenome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE
      matricula_aluno=${matricula} AND situacao='${situacao}' order by S.data_da_solicitacao desc;
      `,
    );

    if (!solicitacoes) {
      throw new NotFoundException(
        `Solicitacoes de ${matricula} ${situacao} not found`,
      );
    }
    return solicitacoes;
  }

  async findSolicitacaoByID(
    id: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const solicitacao = await this.solicitacaoAproveitamentoRepository.query(
      `SELECT SA.*, S.nome AS nome_supervisor, S.sobrenome AS sobrenome_supervisor, S.email AS email_supervisor, S.telefone AS tel_supervisor, T.nome AS nome_atividade, T.tipo_carga_horaria, T.limite_horas, T.horas, A.nome AS nome_aluno, A.sobrenome AS sobrenome_aluno, C.nome AS nome_coordenador, C.sobrenome AS sobrenome_coordenador FROM solicitacao_aproveitamento AS SA INNER JOIN supervisor AS S ON SA.id_supervisor=S.id INNER JOIN tipo_atividade AS T ON SA.id_tipo=T.id INNER JOIN aluno AS A ON SA.matricula_aluno=A.matricula LEFT OUTER JOIN coordenador AS C ON SA.matricula_coordenador=C.matricula_siape WHERE SA.id=${id}; 
      `,
    );

    if (!solicitacao) {
      throw new NotFoundException(`Solicitacao ${id} not found`);
    }
    return solicitacao;
  }

  async findTotalHoursByTipo(
    matricula: number,
    id: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const solicitacao = await this.solicitacaoAproveitamentoRepository.query(
      `SELECT
      T.limite_horas - SUM(carga_aproveitada) AS horas_restantes
    FROM
      solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo = T.id
       WHERE S.matricula_aluno=${matricula} AND S.id_tipo=${id} AND
      S.situacao='Aprovada';
      `,
    );

    if (!solicitacao) {
      throw new NotFoundException(`Solicitacao ${id} not found`);
    }
    return solicitacao;
  }

  async calculateHoursAlunoByMatricula(
    matricula: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const result = await this.solicitacaoAproveitamentoRepository
      .query(`SELECT tipo_atividade.tipo_carga_horaria, SUM(carga_aproveitada) AS Total
      FROM solicitacao_aproveitamento INNER JOIN tipo_atividade ON
      solicitacao_aproveitamento.id_tipo=tipo_atividade.id WHERE
      matricula_aluno=${matricula} AND situacao='Aprovada' GROUP BY
      tipo_atividade.tipo_carga_horaria;
    `);
    if (!result) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return result;
  }

  async calculateMissingExtensionHoursAlunoByMatricula(
    matricula: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const result = await this.solicitacaoAproveitamentoRepository
      .query(`SELECT horas_extensao - (SELECT SUM(carga_aproveitada) FROM
      solicitacao_aproveitamento INNER JOIN tipo_atividade ON
      solicitacao_aproveitamento.id_tipo=tipo_atividade.id WHERE
      matricula_aluno=${matricula} AND situacao='Aprovada' AND
      tipo_carga_horaria='E') AS horas_faltantes FROM curso INNER JOIN aluno
      ON curso.codigo=aluno.codigo_curso WHERE aluno.matricula=${matricula};
    `);
    if (!result) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return result;
  }

  async calculateMissingGeneralHoursAlunoByMatricula(
    matricula: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const result = await this.solicitacaoAproveitamentoRepository
      .query(`SELECT horas_gerais - (SELECT SUM(carga_aproveitada) FROM
      solicitacao_aproveitamento INNER JOIN tipo_atividade ON
      solicitacao_aproveitamento.id_tipo=tipo_atividade.id WHERE
      matricula_aluno=${matricula} AND situacao='Aprovada' AND
      tipo_carga_horaria='G') AS horas_faltantes FROM curso INNER JOIN aluno
      ON curso.codigo=aluno.codigo_curso WHERE aluno.matricula=${matricula};
    `);
    if (!result) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return result;
  }

  async calculateHoursType(
    matricula: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const result = await this.solicitacaoAproveitamentoRepository.query(`Select
    T.id,
      T.nome,
      t.limite_horas - SUM(carga_aproveitada) AS restantes
    FROM
      solicitacao_aproveitamento AS S
      INNER JOIN tipo_atividade AS T ON S.id_tipo = T.id
    WHERE
      (S.matricula_aluno = ${matricula}
      AND S.situacao = 'Aprovada')
    GROUP BY
      T.id
    
    
    UNION
    
    
    SELECT id, nome, limite_horas FROM tipo_atividade WHERE codigo_curso IN (SELECT
          codigo_curso
        FROM
          aluno
        WHERE
          matricula = ${matricula})
          AND id NOT IN (SELECT
      T.id
    FROM
      solicitacao_aproveitamento AS S
      INNER JOIN tipo_atividade AS T ON S.id_tipo = T.id
    WHERE
      (S.matricula_aluno = ${matricula}
      AND S.situacao = 'Aprovada'))
    ORDER BY id;
    `);
    if (!result) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return result;
  }

  async createSolicitacao(body: any): Promise<SolicitacaoAproveitamentoEntity> {
    const result = await this.solicitacaoAproveitamentoRepository.query(`
      START TRANSACTION;
      do $$
      DECLARE solicitacao_inserida integer ;
      
      
      begin
      
      INSERT INTO supervisor (email, nome, sobrenome, telefone)
      VALUES ('${body.email_supervisor}', '${body.nome_supervisor}', '${body.sobrenome_supervisor}', '${body.telefone_supervisor}') 
      ON CONFLICT DO NOTHING;
      
      
      INSERT INTO solicitacao_aproveitamento (descricao, resposta_coordenador, data_da_solicitacao,situacao,carga_real,carga_aproveitada, matricula_aluno,matricula_coordenador,id_tipo,id_supervisor)
      VALUES ( '${body.solicitacao_descricao}', NULL, DEFAULT, 'Pendente', ${body.solicitacao_carga_real},
              NULL, ${body.solicitacao_matricula_aluno},${body.solicitacao_matricula_coordenador}, ${body.solicitacao_id_tipo},
             (SELECT id FROM supervisor WHERE email = '${body.email_supervisor}' and
                nome = '${body.nome_supervisor}' and
                sobrenome = '${body.sobrenome_supervisor}' and
                telefone = '${body.telefone_supervisor}'
            )
            )returning id into solicitacao_inserida;
      
      
      
      
      if '${body.anexo_nome_1}' !='' then
      INSERT INTO anexo
      VALUES
        (
          1, solicitacao_inserida, '${body.anexo_nome_1}',
          '${body.anexo_extensao_1}', '${body.anexo_caminho_1}'
        );
      end if;
      
      
      if '${body.anexo_nome_2}' !='' then
      INSERT INTO anexo
      VALUES
        (
          2, solicitacao_inserida, '${body.anexo_nome_2}',
          '${body.anexo_extensao_2}', '${body.anexo_caminho_2}'
        );
      end if;
      
      
      if '${body.anexo_nome_3}' !='' then
      INSERT INTO anexo
      VALUES
        (
          3, solicitacao_inserida, '${body.anexo_nome_3}',
          '${body.anexo_extensao_3}', '${body.anexo_caminho_3}'
        );
      end if;
    
      end $$;
      COMMIT;
      

    `);
    if (!result) {
      await this.solicitacaoAproveitamentoRepository.query(`
      rollback;
    `);
      throw new NotFoundException(`Error`);
    }
    return result;
  }

  async updateSolicitacao(body: any): Promise<SolicitacaoAproveitamentoEntity> {
    return this.solicitacaoAproveitamentoRepository.save({ ...body });
  }
}
