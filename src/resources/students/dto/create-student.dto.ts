import { ApiProperty } from "@nestjs/swagger";

class StudentAnswer {
    @ApiProperty()
    correctAnswerId: number;
    @ApiProperty()
    questionId: number;
}


export class CreateStudentDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    languages: string;
    @ApiProperty()
    why_do_you_learn_German: string;
    @ApiProperty()
    which_textbook_have_you_worked_with_so_far: string;
    @ApiProperty()
    examId: number;
    @ApiProperty({
        type: [StudentAnswer]
    })
    answers: StudentAnswer[]
}


