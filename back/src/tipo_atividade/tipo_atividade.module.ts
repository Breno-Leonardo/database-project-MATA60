import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAtividadeEntity } from './entities/tipo_atividade.entity';
import { TipoAtividadeController } from './tipo_atividade.controller';
import { TipoAtividadeService } from './tipo_atividade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoAtividadeEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_TIME_EXPIRES },
      }),
    }),
  ],
  controllers: [TipoAtividadeController],
  providers: [TipoAtividadeService],
})
export class TipoAtividadeModule {}
