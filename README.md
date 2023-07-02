# AVALIAÇÃO PRÁTICA MATA60 - Banco de Dados

Sistema para atividades complementares

## Vídeo Demonstração 
https://www.youtube.com/watch?v=8AKrx4YPoso


https://github.com/Breno-Leonardo/database-project-MATA60/assets/58619307/ba2eff0d-30b6-498d-8b2e-7e678f1f787d





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






