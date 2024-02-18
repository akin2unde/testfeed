import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import envConfig from 'src/environment/env-config';
import { User } from 'src/models/db/user';
import { LoginParam } from 'src/models/operation/login-param';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
   
    constructor(private service:AuthService,private configService: ConfigService) {
        
    }
    @Get('test')
    async test(@Res() response): Promise<void> {
    try {
        const port =this.configService.get<string>('PORT');
       const result=await this.service.getAll();
      return response.status(HttpStatus.OK).json(result);
     } catch (err) {
      return response.status(err.status).json(err.response);
     }
    }
    @Post('login')
    async Login(@Body() data: LoginParam): Promise<User> {
    try {
        var result= await this.service.login(data)
      return result
     } catch (err) {
        throw err;
     }
    }
    @Post('saveUser')
    async saveUser(@Body() data: User[]): Promise<User[]> {
    try {
        var result= await this.service.saveUser(data)
      return result;
     } catch (err) {
        throw err;
     }
    }
  
}
