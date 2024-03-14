import { ApiProperty } from "@nestjs/swagger"

class Answer {
    id?: number;
    @ApiProperty()
    answerText: string
    @ApiProperty()
    isCorrect: boolean
}

class Question {
    id?: number;
    @ApiProperty()
    title?: string
    @ApiProperty()
    audioUrl?: string
    @ApiProperty(
        {
            type: [Answer],
        }
    )
    answers: Answer[]
}
export class CreateExamDto {
    @ApiProperty({ type: [Question] })
    questions: Question[]
    @ApiProperty()
    title: string
    @ApiProperty()
    duration: number
}
