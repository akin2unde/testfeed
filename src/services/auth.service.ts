import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginParam } from 'src/models/operation/login-param';
import { AppException } from 'src/middleware/app-exception';
import { User, UserDTO } from 'src/models/db/user';
import { JwtService } from '@nestjs/jwt';
import { TokenUser } from 'src/models/operation/token-user';
import { AsyncLocalStorage } from 'async_hooks';
import { plainToClass, plainToInstance, serialize } from 'class-transformer';

@Injectable()
export class AuthService  {
  
 constructor(private jwtService: JwtService,
  private readonly servive: UserService ,
  ) {
 }
 async getAll()
 { 
   this.servive.getOne({mailAddress:'akin2unde@hotmail.com'})
 }
 async test()
 { 
  // const store = this.als.getStore();
  // return store;
 }
 async login(data:LoginParam):Promise<UserDTO>{
   var user= await this.servive.getOne({mailAddress:data.username,password:data.password}) as UserDTO
   if(!user)
    throw new AppException('user not found');
    user.token=await this.jwtService.signAsync({mailAddress:user.mailAddress,code:user.code.toString()});
    return user;  
 }
 async saveUser(data:UserDTO[]){
   var user= await this.servive.save(data) as UserDTO[]
   user[0].token=await this.jwtService.signAsync({mailAddress: user[0].mailAddress,code: user[0].code.toString()})
   return user;
 }
}
