import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoordenadorEntity } from './entities/coordenador.entity';
import { CoordenadorController } from './coordenador.controller';
import { CoordenadorService } from './coordenador.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoordenadorEntity])],
  controllers: [CoordenadorController],
  providers: [CoordenadorService],
  exports: [CoordenadorService],
})
export class CoordenadorModule {}
