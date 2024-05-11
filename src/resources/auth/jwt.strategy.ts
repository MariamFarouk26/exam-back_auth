import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtSecret } from "./utils/constants";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest:ExtractJwt.fromExtractors([jwtStrategy.extractJWT]),
        secretOrKey:jwtSecret,
    });
  }

  private static extractJWT (req :Request): string|null{
    if(req.cookies && "Token" in req.cookies){
        return req.cookies.Token
    }
    return null;
  }


  // validate token 
  async validate(payload :{id:string ;email:string}) {
    return payload;
  }
}

