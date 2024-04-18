import { ArgumentMetadata, Body, Controller, Get, HttpStatus, Param, Post, Res, UsePipes } from '@nestjs/common';
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
  
    @Get('getAll/:skip/:limit/:sortParam?/:sortOrder?')
    async getAll(@Res() response,@Param('skip') skip:number,@Param('limit') limit:number,@Param('sortParam') sortParam:string,@Param('sortOrder') sortOrder:string): Promise<UserDTO[]> {
    try {
        const result=await this.service.getAllUser(skip,limit,sortParam,sortOrder);
        return response.json(result);
      } catch (err) {
         throw err;;
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
