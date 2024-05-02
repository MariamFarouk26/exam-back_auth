import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorator/role.decrator';
import { jwtAuthGuard } from '../auth/jwt.gaurd';
import { RolesGuard } from '../auth/jwt.permission';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('students')
@ApiTags('faq')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"a new student is added"})
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({description:"get all student ",isArray: true})
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({description:"get spacific student by id "})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"student is updated"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOkResponse({description:"student is deleted "})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }


  @Get(':id/result')
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOkResponse({description:"get the exam result "})
  examResult(@Param('id') id: string) {
    return this.studentsService.examResult(+id)
  }
}
