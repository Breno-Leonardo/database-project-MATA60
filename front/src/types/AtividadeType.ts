
export interface AtividadeType {
  id: number;
  nome: string;
  tipo_carga_horaria:string;
  limite_horas:number;
  horas:number;
  requer_supervisor:boolean;
  codigo_curso:number;
}
