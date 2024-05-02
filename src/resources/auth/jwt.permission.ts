import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole  } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector ) {}
  
    canActivate(context: ExecutionContext): boolean {
       
      //give me quard
      const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
      // console.log(roles)
      if (!roles) {
        return true;
      }

    //decode data of jwt and get data of signin user
      const { user } = context.switchToHttp().getRequest();
      // console.log("user.role",user.role )
      // console.log("user",user )
      return roles.includes(user.role);
    }
  }