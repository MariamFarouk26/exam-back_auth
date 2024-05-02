import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { UserRole } from '@prisma/client';
import { jwtAuthGuard } from '../auth/jwt.gaurd';
import { RolesGuard } from '../auth/jwt.permission';
import { Roles } from '../auth/decorator/role.decrator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';


@Controller('exams')
@ApiTags('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) { }

  
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"a new exam is added"})
  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiOkResponse({description:"get all exam ",isArray: true})
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOkResponse({description:"get spacific exam by id "})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"exam is updated"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto);
  }

  
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({description:"exam is deleted"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }

}
