import { Module } from '@nestjs/common';
import { ExamsModule } from './resources/exams/exams.module';
import { FaqModule } from './resources/faq/faq.module';
import { StudentsModule } from './resources/students/students.module';


@Module({
  imports: [
    ExamsModule,
    FaqModule,
    StudentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
