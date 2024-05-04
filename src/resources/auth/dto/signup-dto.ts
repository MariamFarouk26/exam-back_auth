
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class signupDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    public email :string;

    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3,20,{ message: "pass must be between 3 to 20 char" } )
    public password :string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3,20,{ message: "name must be between 3 to 20 char" } )
    public userName :string;
    
   
}
