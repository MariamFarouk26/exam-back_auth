import { UserRole } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class signupDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email :string;

    @IsNotEmpty()
    @IsString()
    @Length(3,20,{ message: "pass must be between 3 to 20 char" } )
    public password :string;
    
    @IsNotEmpty()
    @IsString()
    @Length(3,20,{ message: "name must be between 3 to 20 char" } )
    public userName :string;
    
    @IsOptional()
    public role :UserRole;
    
  
}
