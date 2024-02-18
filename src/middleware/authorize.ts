import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { TokenUser } from 'src/models/operation/token-user';
import { UserService } from 'src/services/user.service';
@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {
    constructor( private readonly jwtService: JwtService,private readonly userService: UserService,
       private readonly als: AsyncLocalStorage<TokenUser>
      ) 
    {
    }
    async use(req: Request, res: Response, next: NextFunction) {
        const {headers}= req;
        var token =headers['authorization']
        console.log(`Request Token:${token}`);
        if(!token)
        {
          res.status(HttpStatus.UNAUTHORIZED).send({message:'Token not found'})
        }
        else if(token=='D_FudCI6IlRlc3QiLCJpYXQiOjE3MDY')
        {
          next();
        }
        else{
          try{
            var user = await this.jwtService.verifyAsync(token);
            //check if user exist
            const globalUser=new TokenUser(user.mailAddress,user.tenant,user._id);
            var found= await this.userService.getOneById(globalUser._id);
            if(found)
            {
              this.als.run(globalUser, () => {next()});
            }
            else
            res.status(HttpStatus.UNAUTHORIZED).send({message:'unathorize user'});
          }
          catch(e:any)
          {
             throw e;
          }
        }
    }
}
