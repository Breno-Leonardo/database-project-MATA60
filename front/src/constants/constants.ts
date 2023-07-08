export const AUTHORIZATION_KEY = 'AUTHORIZATION_KEY';
export const CURRENT_REQUEST = 'CURRENT_REQUEST';



//Requests
export const URL_BASE="http://localhost:3000"
export const URL_LOGIN = URL_BASE+'/auth/login';
export const URL_CHECK_TOKEN = URL_BASE+'/auth/check';

export const URL_GET_ALUNO  = URL_BASE+'/aluno/lista-alunos';
export const URL_GET_CURSO  = URL_BASE+'/curso';
export const URL_GET_ALL_REQUESTS_ALUNO  = URL_BASE+'/solicitacao-aproveitamento/aluno';
export const URL_GET_HORAS_ALUNO  = URL_BASE+'/solicitacao-aproveitamento/calcular-horas';
export const URL_GET_HORAS_GERAIS_FALTANTES  = URL_BASE+'/solicitacao-aproveitamento/calcular-horas-gerais-faltantes';
export const URL_GET_HORAS_EXTENSAO_FALTANTES  = URL_BASE+'/solicitacao-aproveitamento/calcular-horas-extensao-faltantes';
export const URL_GET_ALL_REQUESTS_COORDENADOR  = URL_BASE+'/solicitacao-aproveitamento/coordenador';
export const URL_GET_REQUEST_BY_ID  = URL_BASE+'/solicitacao-aproveitamento/';
export const URL_GET_ATIVIDADES_BY_CURSO = URL_BASE+'/tipo-atividade';
export const URL_GET_ALL_HORAS_FALTANTES_TIPOS_ATIVIDADES  = URL_BASE+'/solicitacao-aproveitamento/atividades/horas-restantes/';
export const URL_UPLOAD = URL_BASE+"/anexo/upload/";
export const URL_CREATE_SOLICITACAO = URL_BASE+"/solicitacao-aproveitamento/criar";
export const URL_UPDATE_SOLICITACAO = URL_BASE+"/solicitacao-aproveitamento/update";
export const URL_CREATE_SUPERVISOR = URL_BASE+"/supervisor/criar";
export const URL_SUPERVISOR = URL_BASE+"/supervisor/";
export const URL_ANEXOS = URL_BASE+"/anexo/";








export const ERROR_ACCESS_DANIED = 'Sem permissão.';
export const ERROR_CONNECTION = 'Erro de conexão';
export const ERROR_INVALID_PASSWORD = 'Usuário ou senha inválidos.';


