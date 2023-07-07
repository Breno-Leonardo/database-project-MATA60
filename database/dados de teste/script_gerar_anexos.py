# Script para gerar 500000 entradas na tabela abaixo:
# CREATE TABLE anexo (
#  num 				        integer NOT NULL,
#  solicitacao_id 	    	integer NOT NULL REFERENCES solicitacao_aproveitamento(id),
#  nome                       varchar(255) NOT NULL,
#  extensao                   varchar(255) NOT NULL,
#  caminho                    varchar(255) NOT NULL,
#  PRIMARY KEY (num, solicitacao_id)
# );
import random
import datetime
import psycopg2

def get_random_chars(num):
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ') for _ in range(num))

def get_random_caminho(id_solicitacao):
    return f"{id_solicitacao}/{get_random_chars(32)}"

def get_random_nome():
    return f"{get_random_chars(random.randint(1, 10))}"

def get_random_solicitacao():
    return random.randint(1, 200000)

extensoes = ('pdf', 'doc', 'docx', 'odt', 'txt', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'tif', 'zip', 'rar', '7z', 'tar', 'gz', 'xz', 'bz2', 'tgz', 'txz', 'tbz2', 'tbz', 'txz', 'xz', 'bz2', 'tar.bz2', 'tar.gz', 'tar.xz', 'tar.bz', 'tar.gz', 'tar.xz', 'tar.bz2', 'tar.gz', 'tar.xz', 'tar.bz', 'tar.gz', 'tar.xz', 'tar.bz2', 'tar.gz', 'tar.xz', 'tar.bz', 'tar.gz', 'tar.xz', 'tar.bz2', 'tar.gz', 'tar.xz', 'tar.bz', 'tar.gz', 'tar.xz', 'tar.bz2', 'tar.gz', 'tar.xz', 'tar.bz', 'tar.gz', 'tar.xz', 'tar.bz2', 'tar.gz', 'tar.xz', 'tar.bz', 'tar.gz', 'tar.xz')


with open("inserir_anexos.sql", "w") as f:
    f.write(f"INSERT INTO anexo (num, nome, caminho, extensao, solicitacao_id) VALUES\n")
    for i in range(1, 200001):
        # print % done
        if i % 50000 == 0:
            print(f"{i / 2000}%")
        for j in range(1, random.randint(2, 4)):
            f.write(f"({j}, '{get_random_nome()}', '{'c6a07aa31101e45b417469b173c3efde'}', '{'png'}', {i}){',' if i != 200000 else ''}\n")
    f.write(";\n")
