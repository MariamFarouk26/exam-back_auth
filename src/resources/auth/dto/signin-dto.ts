
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class signinDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    public email :string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3,20,{ message: "pass must be between 3 to 20 char" } )
    public password :string;
}
