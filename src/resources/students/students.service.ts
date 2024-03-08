import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/db/prisma.service';


interface Answer {
  id: number;
}

interface Question {
  id: number;
  answers: Answer[];
}

interface Exam {
  Questions: Question[];
}

interface StudentAnswer {
  questionId: number;
  correctAnswerId: number;
}

interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  wrongAnswers: number
}


@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {

  }

  calculateExamResult(studentAnswers: StudentAnswer[], exam: Exam): ExamResult {
    let totalQuestions = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    studentAnswers.forEach((studentAnswer) => {
      const question = exam.Questions.find(q => q.id === studentAnswer.questionId);
      if (question) {
        totalQuestions++;
        const correctAnswerId = question.answers[0].id;
        if (studentAnswer.correctAnswerId === correctAnswerId) {
          correctAnswers++;
        }
      }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;
    wrongAnswers = totalQuestions - correctAnswers;
    return { totalQuestions, correctAnswers, wrongAnswers, percentage };
  }

  async examResult(testId: number) {
    let result = await this.prisma.student.findUnique({
      where: {
        id: testId,
      },
      select: {

        StudentAnswer: {
          select: {

            questionId: true,
            correctAnswerId: true,
          }
        },
        Exam: {
          select: {
            Questions: {

              select: {
                id: true,
                answers: {
                  select: {
                    id: true,
                  },
                  where: {
                    isCorrect: true,

                  }
                }
              }
            }
          }
        }
      }
    })

    return {
      "totalQuestions": this.calculateExamResult(result.StudentAnswer, result.Exam).totalQuestions,
      "correctAnswers": this.calculateExamResult(result.StudentAnswer, result.Exam).correctAnswers,
      "wrongAnswers": this.calculateExamResult(result.StudentAnswer, result.Exam).wrongAnswers,
      "percentage": this.calculateExamResult(result.StudentAnswer, result.Exam).percentage
    }

  }
  async create(createStudentDto: CreateStudentDto) {
    let test = await this.prisma.student.create({
      data: {
        email: createStudentDto.email,
        name: createStudentDto.name,
        phone: createStudentDto.phone,
        languages: createStudentDto.languages,
        why_do_you_learn_German: createStudentDto.why_do_you_learn_German,
        which_textbook_have_you_worked_with_so_far: createStudentDto.which_textbook_have_you_worked_with_so_far,
        Exam: {
          connect: {
            id: createStudentDto.examId

          }
        },
        StudentAnswer: {
          create: createStudentDto.answers.map(answer => ({
            correctAnswerId: answer.correctAnswerId,
            Question: {
              connect: {
                id: answer.questionId
              }
            }

          }))
        }
      }
    });

    return this.examResult(test.id)


  }


  findAll() {
    return this.prisma.student.findMany({
      include: {
        StudentAnswer: {
          select: {
            correctAnswerId: true,
            Question: {
              select: {
                title: true,
                audioUrl: true,
                answers: {
                  select: {
                    answerText: true,
                    isCorrect: true
                  }
                }

              },

            }
          },

        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id }, include: {
        StudentAnswer: {
          select: {
            correctAnswerId: true,
            Question: {
              select: {
                title: true,
                audioUrl: true,
                answers: {
                  select: {
                    answerText: true,
                    isCorrect: true
                  }
                }

              },

            }
          },

        }
      }
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({ where: { id }, data: updateStudentDto })
  }

  remove(id: number) {
    return this.prisma.student.delete({ where: { id } })
  }
}
