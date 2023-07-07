# Script para gerar 50000 entradas na tabela abaixo:
# CREATE TABLE supervisor
# (
#  id      			    serial PRIMARY KEY,
#  email                  varchar(255) NOT NULL,
#  nome                   varchar(255) NOT NULL,
#  sobrenome		        varchar(255),
#  telefone               varchar(20) NOT NULL
# );

import random
import psycopg2

nomes = [
    'João', 'Maria', 'José', 'Ana', 'Francisco', 'Antônio', 'Adriana', 'Luiz', 'Paulo', 'Carlos', 'Pedro', 'Lucas',
    'Marcos', 'Fernando', 'Fernanda', 'Mariana', 'Mário', 'Márcia', 'Miguel', 'Rafael', 'Rafaela', 'Ricardo', 'Rodrigo',
    'Rodrigo', 'Roberto', 'Carlos', 'Cristina', 'Cristiano', 'Cristiane', 'Lavinia', 'Larissa', 'Paula', 'Paulo',
    'Isabela', 'Isabel', 'Isabelly', 'Isadora', 'Isaac', 'Igor', 'Kauã', 'Kauan', 'Kauê', 'Ueslei', 'Uesley',
    'Mat', 'Matheus', 'Minerva', 'Thiago', 'Gustavo', 'Felipe', 'Fernando', 'Amanda', 'Aline', 'Alessandra', 'Alexandre'
]

def get_nome():
    return random.choice(nomes)

def get_random_chars(num):
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') for i in range(num))

def get_sobrenome():
    # random string up to 15 characters
    return get_random_chars(random.randint(5, 15))

def get_email(nome, sobrenome):
    return f"'{nome.lower()}.{sobrenome.lower()}_{get_random_chars(10)}@ufba.br'"

def get_telefone():
    # +55 (99) 99999-9999
    return f"'+55 ({random.randint(10, 99)}) {random.randint(10000, 99999)}-{random.randint(1000, 9999)}'"

conn = psycopg2.connect("dbname=atividades_complementares user=postgres password=root host=localhost port=5432")
cur = conn.cursor()

with open("insert_supervisores.sql", "w") as f:
    f.write("INSERT INTO supervisor (email, nome, sobrenome, telefone) VALUES\n")
    for i in range(50000):
        nome = get_nome()
        sobrenome = get_sobrenome()
        email = get_email(nome, sobrenome)
        telefone = get_telefone()
        f.write(f"({email}, '{nome}', '{sobrenome}', {telefone}){',' if i < 49999 else ';'}\n")

    f.write(";\n")

