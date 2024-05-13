import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { jwtAuthGuard } from '../auth/jwt.gaurd';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('faq')
@ApiTags('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) { }


  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: "a new FAQ is added" })
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {

    return this.faqService.create(createFaqDto);
  }


  @ApiOkResponse({ description: "get all FAQ ", isArray: true })
  @Get()
  findAll() {
    return this.faqService.findAll();
  }


  @ApiOkResponse({ description: "get spacific FAQ by id " })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(+id);
  }


  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: "FAQ is updated" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }


  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: "FAQ is deleted" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }
}
