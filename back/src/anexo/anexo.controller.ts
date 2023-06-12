import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Headers,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { UserType } from 'src/user-type';
import { Roles } from 'src/decorators/roles.decorator';
import { AnexoService } from './anexo.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('anexo')
export class AnexoController {
  constructor(private readonly anexoService: AnexoService) {}

  @Get(':id')
  async getAnexosBySolicitacaoByID(@Param('id') id) {
    return this.anexoService.findAnexosBySolicitacaoByID(id);
  }

  @Post('upload/:solicitacao_id/:num_anexo')
  @UseInterceptors(
    FileInterceptor('anexo', {
      dest: './uploads',
    }),
  )
  uploadFile(
    @UploadedFile() file,
    @Param('solicitacao_id') solicitacaoId,
    @Param('num_anexo') numAnexo,
  ) {
    const nome = file.originalname.split('.');
    this.anexoService.createAnexo(
      numAnexo,
      nome[0],
      nome[1],
      file.filename,
      solicitacaoId,
    );
    //console.log(file);
  }

  @Get('upload/:anexopath')
  seeUploadedFile(@Param('anexopath') file, @Res() res) {
    return res.sendFile(file, { root: 'uploads' });
  }
}
