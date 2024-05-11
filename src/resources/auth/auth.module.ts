import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt"
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/db/prisma.service';
import { jwtStrategy } from './jwt.strategy';
@Module({
  imports:[JwtModule,PassportModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,jwtStrategy],
})
export class AuthModule {}
