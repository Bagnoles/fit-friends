import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  //UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CoachInterviewService } from './coach-interview.service';
import { CreateCoachInterviewDto } from './dto/create-coach-interview.dto';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';

@ApiTags('coach/interview')
@Controller('coach/interview')
export class CoachInterviewController {
  constructor(
    private readonly interviewService: CoachInterviewService,
    private readonly fileService: FileUploaderService,
  ) {}

  @Get('/:id')
  public async index(@Param('id') id: string) {
    const result = await this.interviewService.getInterview(id);
    return {
      ...result.toPOJO(),
      certificate: (
        await this.fileService.getFile(result.certificateId)
      ).toPOJO(),
    };
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() dto: CreateCoachInterviewDto,
    //@UploadedFile() file: Express.Multer.File,
  ) {
    //const fileEntity = await this.fileService.saveFile(file);
    const result = await this.interviewService.saveInterview({
      ...dto,
      certificateId: '97bce6d3-7560-4901-9238-17e750b09ee1',
    });
    return {
      ...result.toPOJO(),
      certificate: (
        await this.fileService.getFile(result.certificateId)
      ).toPOJO(),
    };
  }
}
