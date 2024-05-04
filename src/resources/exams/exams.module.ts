import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService, PrismaService],
  imports: [],
})
export class ExamsModule { }
