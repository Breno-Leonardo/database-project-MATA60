import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnexoEntity } from './entities/anexo.entity';
import { AnexoController } from './anexo.controller';
import { AnexoService } from './anexo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnexoEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_TIME_EXPIRES },
      }),
    }),
  ],
  controllers: [AnexoController],
  providers: [AnexoService],
})
export class AnexoModule {}
