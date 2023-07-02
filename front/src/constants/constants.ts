export const AUTHORIZATION_KEY = 'AUTHORIZATION_KEY';
export const CURRENT_REQUEST = 'CURRENT_REQUEST';



//Requests
export const URL_BASE="http://localhost:3000"
export const URL_LOGIN = URL_BASE+'/auth/login';
export const URL_CHECK_TOKEN = URL_BASE+'/auth/check';

export const URL_GET_ALL_COLLABORATORS  = URL_BASE+'/colaborador/lista-colaboradores';
export const URL_CREATE_COLLABORATOR= URL_BASE+'/colaborador/cadastro';
export const URL_GET_ALL_TEAM_COLLABORATORS  = URL_BASE+'/colaborador/lista-colaboradores/time';
export const URL_DELETE_COLLABORATOR  = URL_BASE+'/colaborador/lista-colaboradores/delete';
export const URL_UPDATE_COLLABORATOR= URL_BASE+'/colaborador/lista-colaboradores/atualizar';
export const URL_GET_ALL_TEAMS  = URL_BASE+'/times/lista-times';
export const URL_GET_TEAM_BY_ID  = URL_BASE+'/times/lista-times/id/';
export const URL_CREATE_TEAM= URL_BASE+'/times/cadastro';

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
export const URL_CREATE_SUPERVISOR = URL_BASE+"/supervisor/criar";
export const URL_SUPERVISOR = URL_BASE+"/supervisor/";
export const URL_ANEXOS = URL_BASE+"/anexo/";







export const URL_GET_ALL_VACATION_REQUEST  = URL_BASE+'/solicitacao-ferias/lista-solicitacoes';
export const URL_CREATE_VACATION_REQUEST= URL_BASE+'/solicitacao-ferias/nova-solicitacao';
export const URL_UPDATE_VACATION_REQUEST= URL_BASE+'/solicitacao-ferias/update';
export const URL_ACCEPT_VACATION_REQUEST= URL_BASE+'/solicitacao-ferias/aprovar';

export const URL_GET_ALL_THIRTEENTH_REQUEST  = URL_BASE+'/decimo-terceiro/lista-solicitacoes';
export const URL_CREATE_THIRTEENTH_REQUEST= URL_BASE+'/decimo-terceiro/nova-solicitacao';

export const ERROR_ACCESS_DANIED = 'Sem permissão.';
export const ERROR_CONNECTION = 'Erro de conexão';
export const ERROR_INVALID_PASSWORD = 'Usuário ou senha inválidos.';


// python
export const URL_BASE_PYTHON="http://127.0.0.1:5000"
export const URL_MESSAGE_EMAIL = URL_BASE_PYTHON+'/enviar-email';
export const URL_MESSAGE_EMAIL_RESPONSE = URL_BASE_PYTHON+'/enviar-email-resposta';
export const URL_MESSAGE_WORKPLACE = URL_BASE_PYTHON+'/enviar-mensagem-workplace';
export const URL_XLSX = URL_BASE_PYTHON+'/baixar-xlsx';
export const URL_CSV = URL_BASE_PYTHON+'/baixar-csv';