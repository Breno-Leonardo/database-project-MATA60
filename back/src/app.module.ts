import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createTables1678662502071 } from './migration/1678662502071-createTables';
import { initialData1678664119697 } from './migration/1678664119697-initial_data';
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
        migrations: [createTables1678662502071, initialData1678664119697],
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
