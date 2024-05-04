import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { jwtAuthGuard } from '../auth/jwt.gaurd';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('students')
@ApiTags('faq')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }


  @ApiCreatedResponse({description:"a new student is added"})
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }


  @UseGuards(jwtAuthGuard)
  @ApiOkResponse({description:"get all student ",isArray: true})
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }


  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({description:"get spacific student by id "})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }


  @ApiCreatedResponse({description:"student is updated"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }


  @ApiOkResponse({description:"student is deleted "})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }


  @Get(':id/result')
  @ApiOkResponse({description:"get the exam result "})
  examResult(@Param('id') id: string) {
    return this.studentsService.examResult(+id)
  }
}
