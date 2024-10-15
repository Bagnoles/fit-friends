import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get('/:id')
  public async index(@Param('id') id: string) {
    const result = await this.interviewService.getInterview(id);
    return result;
  }

  //@UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateInterviewDto) {
    const result = await this.interviewService.saveInterview(dto);
    return result;
  }
}
