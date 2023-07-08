# AVALIAÇÃO PRÁTICA MATA60 - Banco de Dados

Sistema para atividades complementares

![Mapeamento Final](https://github.com/Breno-Leonardo/database-project-MATA60/assets/58619307/91ea8234-6dcc-483f-a847-7805a0c07ed7)

## Vídeo Demonstração 
https://youtu.be/MeV_LGHvX1k

https://github.com/Breno-Leonardo/database-project-MATA60/assets/58619307/b6de7f8b-dfbc-4a7d-8c5d-0528c9f90686



# Instruções para executar

## Front-end

```
cd front
npm i
npm run dev
```

## Back-end
```
cd back
npm i
npm run start:dev
```

É preciso criar um arquivo .env na pasta back com as seguintes informações:

```
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=
DB_PORT=5432
DB_DATABASE=siscomp
DB_SCHEMA=public
JWT_SECRET=SenhaInquebravel
JWT_TIME_EXPIRES=7d
```

O hash senha de todos os usuarios nas migations referência a senha "123".

O git clone do repositório pode demorar devido aos arquivos de migration com os dados de teste. 






