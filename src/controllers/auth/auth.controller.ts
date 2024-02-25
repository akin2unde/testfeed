import { ArgumentMetadata, Body, Controller, Get, HttpStatus, Post, Res, UsePipes } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import envConfig from 'src/environment/env-config';
import { User, UserDTO } from 'src/models/db/user';
import { LoginParam } from 'src/models/operation/login-param';
import { ModelValidation } from 'src/pipes/model-validation';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
   
    constructor(private service:AuthService,private configService: ConfigService) {
        
    }
    @Get('test')
    async test(@Res() response): Promise<void> {
    try {
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
    @UsePipes(new ModelValidation(UserDTO))
    async saveUser(@Body() data: UserDTO[]): Promise<UserDTO[]> {
    try {
        var result= await this.service.saveUser(data)
      return result;
     } catch (err) {
        throw err;
     }
    }
}
