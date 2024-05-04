import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { jwtAuthGuard } from '../auth/jwt.gaurd';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';


@Controller('exams')
@ApiTags('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) { }

  
  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"a new exam is added"})
  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }


  @ApiOkResponse({description:"get all exam ",isArray: true})
  @Get()
  findAll() {
    return this.examsService.findAll();
  }

 

  @ApiOkResponse({description:"get spacific exam by id "})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  
  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"exam is updated"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto);
  }

  
  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({description:"exam is deleted"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }

}
