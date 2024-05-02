import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ExamsService {


  constructor(private readonly prisma: PrismaService) {

  }
  create(createExamDto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        duration: createExamDto.duration,
        title: createExamDto.title,
        questions: {
          create: createExamDto.questions.map(question => ({
            title: question.title,
            audioUrl: question.audioUrl,
            answers: {
              create: question.answers.map(answer => ({
                answerText: answer.answerText,
                isCorrect: answer.isCorrect,

              }))
            }
          }))
        }
      }
    });

  }

  findAll() {
    return this.prisma.exam.findMany(
      {
        select: {
          id: true,
          duration: true,
          title: true,
          questions: {
            select: {
              id: true,
              title: true,
              audioUrl: true,
              answers: {
                select: {
                  id: true,
                  answerText: true,
                  isCorrect: true

                }
              }
            }
          }
        }
      }
    );
  }

  findOne(id: number) {
    return this.prisma.exam.findUnique({
      where: { id }, select: {
        id: true,
        duration: true,
        title: true,
        questions: {
          select: {
            id: true,
            title: true,
            audioUrl: true,
            answers: {
              select: {
                id: true,
                answerText: true,
                isCorrect: true

              }
            }
          }
        }
      }
    });
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    // return this.prisma.exam.update({
    //   where: { id },
    //   data: {
    //     duration: updateExamDto.duration,
    //     title: updateExamDto.title,
    //     questions: {
    //       update: updateExamDto.questions.map(question => ({
    //         where: { id: question.id },
    //         data: {
    //           title: question.title,
    //           audioUrl: question.audioUrl,
    //           answers: {
    //             update: question.answers.map(answer => ({
    //               where: { id: answer.id },
    //               data: {
    //                 answerText: answer.answerText,
    //                 isCorrect: answer.isCorrect
    //               }
    //             }))
    //           }
    //         }
    //       }))
    //     }
    //   }
    // })
    return 'this method is not implemented'
  }

  async remove(id: number) {
    // return this.prisma.exam.delete({ where: { id } })
    let deletedProduct =  await this.prisma.exam.delete({ where: { id } });
    return {message : "deleted Successfully",data : deletedProduct}
  }
}
