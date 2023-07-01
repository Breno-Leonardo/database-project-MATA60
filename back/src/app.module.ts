import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createTables1678662502071 } from './migration/1678662502071-createTables';
import { initialDataCoordenador1678662502072 } from './migration/initial_data_coordenador';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';
import { JwtModule } from '@nestjs/jwt';
import { CursoModule } from './curso/curso.module';
import { AlunoModule } from './aluno/aluno.module';
import { SolicitacaoAproveitamentoModule } from './solicitacao_aproveitamento/solicitacao_aproveitamento.module';
import { TipoAtividadeModule } from './tipo_atividade/tipo_atividade.module';
import { CoordenadorModule } from './coordenador/coordenador.module';
import { AnexoModule } from './anexo/anexo.module';
import { CursoEntity } from './curso/entities/curso.entity';
import { AlunoEntity } from './aluno/entities/aluno.entity';
import { CoordenadorEntity } from './coordenador/entities/coordenador.entity';
import { SolicitacaoAproveitamentoEntity } from './solicitacao_aproveitamento/entities/solicitacao_aproveitamento.entity';
import { TipoAtividadeEntity } from './tipo_atividade/entities/tipo_atividade.entity';
import { AnexoEntity } from './anexo/entities/anexo.entity';
import { SupervisorEntity } from './supervisor/entities/supervisor.entity';
import { SupervisorModule } from './supervisor/supervisor.module';
import { MulterModule } from '@nestjs/platform-express';
import { initialDataSolicitacao1678662502077 } from './migration/initial_data_solicitacao1';
import { initialDataAluno1678662502074 } from './migration/initial_data_aluno';
import { initialDataAtividade1678662502075 } from './migration/initial_data_atividade';
import { initialDataCurso1678662502073 } from './migration/initial_data_curso';
import { initialDataSupervisor1678662502076 } from './migration/initial_data_supervisor';
import { initialDataAnexo1678662502088 } from './migration/initial_data_anexo';
import { initialDataSolicitacao1678662502078 } from './migration/initial_data_solicitacao2';
import { initialDataSolicitacao1678662502079 } from './migration/initial_data_solicitacao3';
import { initialDataSolicitacao1678662502080 } from './migration/initial_data_solicitacao4';
import { initialDataSolicitacao1678662502081 } from './migration/initial_data_solicitacao5';
import { initialDataSolicitacao1678662502082 } from './migration/initial_data_solicitacao6';
import { initialDataSolicitacao1678662502083 } from './migration/initial_data_solicitacao7';
import { initialDataSolicitacao1678662502084 } from './migration/initial_data_solicitacao8';
import { initialDataSolicitacao1678662502085 } from './migration/initial_data_solicitacao9';
import { initialDataSolicitacao1678662502086 } from './migration/initial_data_solicitacao10';
import { initialDataChanges1678662502089 } from './migration/initial_data_changes';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        port: +configService.get<number>('DB_PORT'),
        schema: configService.get('DB_SCHEMA'),
        entities: [
          CursoEntity,
          AlunoEntity,
          CoordenadorEntity,
          SupervisorEntity,
          SolicitacaoAproveitamentoEntity,
          TipoAtividadeEntity,
          AnexoEntity,
        ],
        migrations: [
          createTables1678662502071,
          initialDataCoordenador1678662502072,
          initialDataCurso1678662502073,
          initialDataAluno1678662502074,
          initialDataAtividade1678662502075,
          initialDataSupervisor1678662502076,
          initialDataSolicitacao1678662502077,
          initialDataSolicitacao1678662502078,
          initialDataSolicitacao1678662502079,
          initialDataSolicitacao1678662502080,
          initialDataSolicitacao1678662502081,
          initialDataSolicitacao1678662502082,
          initialDataSolicitacao1678662502083,
          initialDataSolicitacao1678662502084,
          initialDataSolicitacao1678662502085,
          initialDataSolicitacao1678662502086,
          //initialDataAnexo1678662502088,
          initialDataChanges1678662502089,
        ],
        migrationsRun: true,
        // synchronize: true,
      }),
    }),
    CursoModule,
    AlunoModule,
    CoordenadorModule,
    SolicitacaoAproveitamentoModule,
    TipoAtividadeModule,
    AnexoModule,
    SupervisorModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
