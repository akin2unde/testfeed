import { Controller, Res,Get, HttpStatus, Post, Body, UsePipes } from '@nestjs/common';
import { RequestDTO } from 'src/models/db/request';
import { ModelValidation } from 'src/pipes/model-validation';
import { RequestService } from 'src/services/request.service';

@Controller('feature')
export class RequestController {
    constructor(private service:RequestService) {
        
    }
    @Get('test')
    async test(@Res() response): Promise<void> {
    try {
        return response.status(HttpStatus.OK).json({});
      } catch (err) {
      return response.status(err.status).json(err.response);
     }
    }
    @Post('save')
    @UsePipes(new ModelValidation(RequestDTO))
    async saveUser(@Body() data: RequestDTO[]): Promise<RequestDTO[]> {
    try {
        var result= await this.service.saveMany(data)
        return result;
     } catch (err) {
        throw err;
     }
    } 
    @Get('getAll')
    async getAll(@Res() response): Promise<RequestDTO[]> {
    try {
        const result= await this.service.getAll();
        return response.status(HttpStatus.OK).json(result);
     } catch (err) {
        throw err;
     }
    }
}
