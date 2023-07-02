export interface RequestBody {
  nome: string;
  data_da_solicitacao: Date;
  descricao: string;
  carga_real: number;
  carga_aproveitada: number;
  resposta_coordenador:string;
  id_supervisor: number;
  nome_atividade: string;
  tipo_caraga_horaria: string;
  matricula: string;
  sobrenome: string;
  id: number;
  requer_supervisor:boolean;
}
