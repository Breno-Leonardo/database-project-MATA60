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
import { diskStorage } from 'multer';
@Controller('anexo')
export class AnexoController {
  constructor(private readonly anexoService: AnexoService) {}
  @Roles([UserType.Aluno, UserType.Coordenador])
  @Get(':id')
  async getAnexosBySolicitacaoByID(@Param('id') id) {
    return this.anexoService.findAnexosBySolicitacaoByID(id);
  }

  @Post('upload/:caminho')
  @UseInterceptors(
    FileInterceptor('anexo', {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${req.params.caminho}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return;
  }

  @Get('upload/:nome/:anexopath')
  seeUploadedFile(@Param('anexopath') file, @Param('nome') nome, @Res() res) {
    return res.download('uploads/' + file, nome);
    // return res.sendFile(file, { root: 'uploads' });
  }
}
