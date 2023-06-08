import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from './entities/curso.entity';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEntity])],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
})
export class CursoModule {}
