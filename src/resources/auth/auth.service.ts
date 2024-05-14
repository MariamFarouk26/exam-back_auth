import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt"
import { jwtSecret } from './utils/constants';
import { Request, Response } from 'express';
import { PrismaService } from 'src/db/prisma.service';
import { signupDto } from './dto/signup-dto';
import { signinDto } from './dto/signin-dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }


  async SignUp(dto: signupDto) {
    const { email, password, userName } = dto;

    const foundUser = await this.IsfoundUser(email);
    if (foundUser) {
      throw new BadRequestException('Email is taken')
    }

    const hashedpassword = await this.hashPassword(password);
    await this.prisma.user.create({
      data: {
        email,
        hashPass: hashedpassword,
        userName
      }
    });

    return { message: `signup successfully , ${userName}` }
  }


  async SignIn(dto: signinDto, req: Request, res: Response) {
    const { email, password } = dto;

    //to check the email
    const foundUser = await this.IsfoundUser(email);

    if (!foundUser) {
      console.log(foundUser)
      throw new BadRequestException('Wrong Email or Password')
    }

    //to check the pass
    const IsMatch = await this.comparePassword(password, foundUser.hashPass);
    if (!IsMatch) {
      console.log(IsMatch)
      throw new BadRequestException('Wrong Email or Password')
    }

    //sign jwt and return user
    const token = await this.signToken({ id: foundUser.id, email: foundUser.email })
    if (!token) {
      //stop func if no token else send jwt as cookie to client 
      throw new ForbiddenException()
    }


    return res.send({
      message: 'logged in successfully',
      access_token: `Bearer ${token}`
    });
  }


  //clean token from client
  async SignOut(res: Response) {
    //remove cookie by it's name which used in sign in
    res.clearCookie("Token")
    return res.send({ message: "logged out successfully" })
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword
  }

  async IsfoundUser(email: string) {
    const found = await this.prisma.user.findUnique({ where: { email } })
    return found
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async signToken(args: { id: string; email: string }) {
    let payload = args
    return this.jwt.signAsync(payload, { secret: jwtSecret })
  }
}
