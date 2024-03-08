import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {

  }
  create(createFaqDto: CreateFaqDto) {
    return this.prisma.faq.create({ data: createFaqDto });
  }

  findAll() {
    return this.prisma.faq.findMany();
  }

  findOne(id: number) {
    return this.prisma.faq.findUnique({ where: { id } });
  }

  update(id: number, updateFaqDto: UpdateFaqDto) {
    return this.prisma.faq.update({ where: { id }, data: updateFaqDto });
  }

  remove(id: number) {
    return this.prisma.faq.delete({ where: { id } });
  }
}
