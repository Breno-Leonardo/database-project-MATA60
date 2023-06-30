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
      `SELECT S.id, S.situacao, S.data_da_solicitacao, T.nome AS nome_atividade, T.tipo_carga_horaria, A.matricula, A.nome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE 
      C.matricula_coordenador=${matricula_siape};
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
      `SSELECT S.id, S.situacao, S.data_da_solicitacao, T.nome AS nome_atividade, T.tipo_carga_horaria, A.matricula, A.nome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE
      C.matricula_coordenador=${matricula_siape} AND S.situacao='${situacao}';
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
      `SELECT S.id, S.situacao, S.data_da_solicitacao, T.nome AS nome_atividade, T.tipo_carga_horaria, A.matricula, A.nome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE 
      matricula_aluno=${matricula};
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
      `SELECT S.id, S.situacao, S.data_da_solicitacao, T.nome AS nome_atividade, T.tipo_carga_horaria, A.matricula, A.nome FROM solicitacao_aproveitamento AS S INNER JOIN tipo_atividade AS T ON S.id_tipo=T.id INNER JOIN aluno AS A ON S.matricula_aluno=A.matricula INNER JOIN curso AS C ON C.codigo=T.codigo_curso WHERE
      matricula_aluno=${matricula} AND situacao='${situacao}';
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
    const aluno = await this.solicitacaoAproveitamentoRepository
      .query(`SELECT tipo_atividade.tipo_carga_horaria, SUM(carga_aproveitada) AS Total
      FROM solicitacao_aproveitamento INNER JOIN tipo_atividade ON
      solicitacao_aproveitamento.id_tipo=tipo_atividade.id WHERE
      matricula_aluno=${matricula} AND situacao='Aprovada' GROUP BY
      tipo_atividade.tipo_carga_horaria;
    `);
    if (!aluno) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return aluno;
  }

  async calculateMissingExtensionHoursAlunoByMatricula(
    matricula: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const aluno = await this.solicitacaoAproveitamentoRepository
      .query(`SELECT horas_extensao - (SELECT SUM(carga_aproveitada) FROM
      solicitacao_aproveitamento INNER JOIN tipo_atividade ON
      solicitacao_aproveitamento.id_tipo=tipo_atividade.id WHERE
      matricula_aluno=${matricula} AND situacao='Aprovada' AND
      tipo_carga_horaria='E') AS horas_faltantes FROM curso INNER JOIN aluno
      ON curso.codigo=aluno.codigo_curso WHERE aluno.matricula=${matricula};
    `);
    if (!aluno) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return aluno;
  }

  async calculateMissingGeneralHoursAlunoByMatricula(
    matricula: number,
  ): Promise<SolicitacaoAproveitamentoEntity> {
    const aluno = await this.solicitacaoAproveitamentoRepository
      .query(`SELECT horas_gerais - (SELECT SUM(carga_aproveitada) FROM
      solicitacao_aproveitamento INNER JOIN tipo_atividade ON
      solicitacao_aproveitamento.id_tipo=tipo_atividade.id WHERE
      matricula_aluno=${matricula} AND situacao='Aprovada' AND
      tipo_carga_horaria='G') AS horas_faltantes FROM curso INNER JOIN aluno
      ON curso.codigo=aluno.codigo_curso WHERE aluno.matricula=${matricula};
    `);
    if (!aluno) {
      throw new NotFoundException(`Aluno: ${matricula} not found`);
    }
    return aluno;
  }
}
