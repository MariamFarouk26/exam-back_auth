import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup-dto';
import { signinDto } from './dto/signin-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 

 @Get('signout')
  signout(@Res() res) {
    return this.authService.SignOut(res);
  }

  @Post("signup")
  signup(@Body() dto:signupDto){
    return this.authService.SignUp(dto);
  }

  @Post("signin")
  signin(@Body() dto:signinDto , @Req() req  , @Res() res ){
    return this.authService.SignIn(dto,req,res);
  }

}
