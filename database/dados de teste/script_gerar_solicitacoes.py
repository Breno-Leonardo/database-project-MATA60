# Script para gerar 200000 entradas na tabela abaixo:
# CREATE TABLE solicitacao_aproveitamento (
#  id					        serial PRIMARY KEY,
#  descricao 			        varchar(4000) NOT NULL,
#  resposta_coordenador       varchar(4000),
#  data_da_solicitacao        date NOT NULL DEFAULT now(),
#  situacao 				    varchar(20) NOT NULL,
#  carga_real 			    integer NOT NULL,
#  carga_aproveitada 		    integer,
#  matricula_aluno 		    integer NOT NULL REFERENCES aluno(matricula),
#  matricula_coordenador 	    integer REFERENCES coordenador(matricula_siape),
#  id_tipo 				    integer NOT NULL REFERENCES tipo_atividade(id),
#  id_supervisor			    integer REFERENCES supervisor(id)
# );

import random
import datetime
import psycopg2

# Função para gerar uma data aleatória
def random_date(start=datetime.date(2012, 1, 1), end=datetime.date.today()):
    return f'\'{(start + datetime.timedelta(days=random.randint(0, (end - start).days))).strftime("%Y-%m-%d")}\''

# Função para gerar uma string aleatória
def random_string(length):
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ') for i in range(length))


conn = psycopg2.connect("dbname=atividades_complementares user=postgres password=root host=localhost port=5432")
cur = conn.cursor()

cur.execute("SELECT matricula, codigo_curso FROM atividades_complementares.aluno")
ALUNOS_CURSO = cur.fetchall()

cur.execute("SELECT codigo, matricula_coordenador FROM atividades_complementares.curso")
COORDENADORES_COM_CURSO = dict(cur.fetchall())

cur.execute("SELECT matricula_siape FROM atividades_complementares.coordenador")
COORDENADORES_SEM_CURSO = list({x[0] for x in cur.fetchall()} - {x for x in COORDENADORES_COM_CURSO.values()})

ATIVIDADES_POR_CURSO = {}
for curso in COORDENADORES_COM_CURSO:
    cur.execute(f"SELECT id, requer_supervisor FROM atividades_complementares.tipo_atividade WHERE codigo_curso = {curso}")
    ATIVIDADES_POR_CURSO[curso] = cur.fetchall()


def get_coordenador(id_curso):
    if random.randint(0, 100) < 90:
        return COORDENADORES_COM_CURSO[id_curso]
    else:
        return random.choice(COORDENADORES_SEM_CURSO)

def get_aluno_e_curso():
    return random.choice(ALUNOS_CURSO)

def get_tipo_atividade(id_curso):
    try:
        return random.choice(ATIVIDADES_POR_CURSO[id_curso])
    except IndexError:
        print(id_curso)

def get_descricao():
    return f"'{random_string(random.randint(100, 3900))}'"

def get_supervisor():
    return random.randint(1, 50000)

def get_situacao():
    return f"'{random.choice(['Aprovada', 'Reprovada', 'Pendente'])}'"

def get_carga_real():
    return random.randint(1, 80) * 5

def get_carga_aproveitada(situacao, real):
    if situacao == "'Aprovada'":
        return real - random.randint(0, real // 2)
    else:
        return "NULL"

def get_resposta_coordenador(situacao):
    if situacao in ("'Aprovada'", "'Pendente'"):
        return "NULL"
    else:
        return f"'{random_string(random.randint(100, 3900))}'"

for j in range(10):
    with open(f"insert_solicitacoes_{j}.sql", "w") as f:
        f.write("""INSERT INTO atividades_complementares.solicitacao_aproveitamento(descricao, resposta_coordenador, data_da_solicitacao, situacao, carga_real, carga_aproveitada, matricula_aluno, matricula_coordenador, id_tipo, id_supervisor) VALUES\n""")
        for i in range(20000):
            if not i % 1000:
                print(f"{j} - " + "{}%".format(i / 20000 * 100))
            situacao = get_situacao()
            aluno, id_curso = get_aluno_e_curso()
            carga_real = get_carga_real()
            atividade, requer = get_tipo_atividade(id_curso)
            f.write("({}, {}, {}, {}, {}, {}, {}, {}, {}, {}){}\n".format(
                get_descricao(),
                get_resposta_coordenador(situacao),
                random_date(),
                situacao,
                carga_real,
                get_carga_aproveitada(situacao, carga_real),
                aluno,
                get_coordenador(id_curso),
                atividade,
                get_supervisor() if requer else "NULL",
                "," if i != 19999 else "")
            )
        f.write(";\n")