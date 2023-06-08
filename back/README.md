# Back-end

O back-end se baseia no MER:

![image](https://user-images.githubusercontent.com/58619307/231471747-b77dfd38-71a0-4890-a169-4ca0d0f9b8cd.png)

O módulo TeamModule é referente a entidade time, um time possui necessariamente um gestor.

O módulo ThirteenthRequestModule é referente a entidade solicitacao_decimo_terceiro.

O módulo VacationRequestModule é referente a entidade solicitacao_ferias.

O módulo CollaboratorModule é referente a entidade colaborador, possui relacionamento com todas as outras.

A aplicação possui quatro perfis de usuário, gestor, colaborador e gestor-colaborador. Gestor aprova solicitações de férias dos times os quais ele lidera, colaborador pode solicitar férias e adiantamento do décimo terceiro, gestor-colaborador possui acesso aos dois tipos de perfis, além desses principais existe o perfil admin, responsável por cadastrar colaboradores e times, atualizar e remover colaboradores.

Um colaborador que lidera um ou mais times e integra um time é um gestor-colaborador, se ele somente lidera um ou mais times é somente um gestor e se ele não lidera nenhum time e integra um ele é um colaborador.

É necessario um arquivo de ambiente .env, segue o esqueleto abaixo.

```
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_SCHEMA=

JWT_SECRET=
JWT_TIME_EXPIRES=

ADMIN_LOGIN=
ADMIN_PASSWORD= senha criptografada do admin
```

## Rotas:


### Colaborador

```
Todos Colaboradores: URL_BASE/colaborador/lista-colaboradores

Criar Colaborador: URL_BASE/colaborador/cadastro
Body:
{
"matricula": "",
"nome": "",
"cpf": "",
"cargo": "",
"email": "",
"gmail": "",
"dataAdmissao": "1980-01-01",
"saldoDiasFerias": 20,
"modeloContratacao": "CLT",
"fimAquisitivo": "2023-04-04",
"senha": "",
"time":1
}

Todos Colaboradores de um time: URL_BASE/colaborador/lista-colaboradores/time/:idTime

Colaborador por matrícula: URL_BASE/colaborador/lista-colaboradores/:matricula

Remover Colaborador: URL_BASE/colaborador/lista-colaboradores/delete/:matricula

Atualizar Colaborador: URL_BASE/colaborador/lista-colaboradores/atualizar/:matricula
Body:
{
"matricula": "",
"nome": "",
"cpf": "",
"cargo": "",
"email": "",
"gmail": "",
"saldoDiasFerias": 20,
"modeloContratacao": "CLT",
"time":1
}
```


### Time
```
Todos Times: URL_BASE/times/lista-times

Time por ID: URL_BASE/times/lista-times/id/:id

Time por matrícula do gestor: URL_BASE/times/lista-times/:matricula

Criar Time: URL_BASE/times/cadastro
Body:
{
 "nome": "",
 "gestor": "20"
}
```

### Décimo Terceiro

```
Todas solicitações de décimo terceiro: URL_BASE/decimo-terceiro/lista-solicitacoes

Solicitação por matricula do colaborador: URL_BASE/decimo-terceiro/lista-solicitacoes/:matricula

Criar Solicitação: URL_BASE/decimo-terceiro/nova-solicitacao
Body:
{
 "dataSolicitacao": "2023-01-01",
 "colaborador": "0"
}
```

### Férias


```
Todas solicitações de férias: URL_BASE/solicitacao-ferias/lista-solicitacoes

Todas solicitações de férias de um time: URL_BASE/solicitacao-ferias/lista-solicitacoes/time/:timeId

Todas solicitações de férias por uma matrícula: URL_BASE/solicitacao-ferias/lista-solicitacoes/:matricula

Solicitação de férias por ID: URL_BASE/solicitacao-ferias/lista-solicitacoes/id/:id

Criar Solicitação: URL_BASE/solicitacao-ferias/nova-solicitacao
Body:
{
 "dataSolicitacao": "2021-07-27",
	"dataInicio": "2021-03-07",
	"dataTermino": "2021-04-09",
	"mensagemColaborador":"mensagem",
	"mensagemGestor": "",
	"colaborador":"87",
	"statusSolicitacao":"Em Férias"
}

Atualizar Solicitação: URL_BASE/solicitacao-ferias/update/:id
Body:
{
	"mensagemGestor": "",
	"statusSolicitacao":""
}

Aprovar: URL_BASE/solicitacao-ferias/aprovar/:id/:debitoDeDias
Body:
{
	"mensagemGestor": "",
	"statusSolicitacao":""
}
```

### Autenticacão

```
Login: URL_BASE/auth/login
Body:
{
	"matricula":"",
	"senha":""
}
```


Todas as rotas necessitam do token de autenticação no header em Authorization, ele pode ser obtido com a rota de autenticação, entretanto algumas rotas tem limitação de acesso a admin ou gestor. A rota de criação de requisição precisa ter a mesma matrícula de colaborador no token de autenticação e no body.
