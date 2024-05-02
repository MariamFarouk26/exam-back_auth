import { Module } from '@nestjs/common';
import { ExamsModule } from './resources/exams/exams.module';
import { FaqModule } from './resources/faq/faq.module';
import { StudentsModule } from './resources/students/students.module';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    ExamsModule,
    FaqModule,
    StudentsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
