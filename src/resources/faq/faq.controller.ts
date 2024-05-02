import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorator/role.decrator';
import { jwtAuthGuard } from '../auth/jwt.gaurd';
import { RolesGuard } from '../auth/jwt.permission';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('faq')
@ApiTags('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"a new FAQ is added"})
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({description:"get all FAQ ",isArray: true})
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({description:"get spacific FAQ by id "})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(+id);
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiCreatedResponse({description:"FAQ is updated"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }


  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOkResponse({description:"FAQ is deleted"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }
}
