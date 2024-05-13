import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto } from './dto/signin-dto';
import { signupDto } from './dto/signup-dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({ description: "signed out successfully " })
  @Get('signout')
  signout(@Res() res) {
    return this.authService.SignOut(res);
  }


  // @ApiCreatedResponse({description:"signed up successfully"})
  // @Post("signup")
  // signup(@Body() dto:signupDto){
  //   return this.authService.SignUp(dto);
  // }

  @ApiCreatedResponse({ description: "signed in successfully" })
  @Post("signin")
  signin(@Body() dto: signinDto, @Req() req, @Res() res) {
    return this.authService.SignIn(dto, req, res);
  }

}
