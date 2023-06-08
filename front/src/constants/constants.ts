export const AUTHORIZATION_KEY = 'AUTHORIZATION_KEY';
export const CURRENT_VACATION_REQUEST = 'CURRENT_VACATION_REQUEST';



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