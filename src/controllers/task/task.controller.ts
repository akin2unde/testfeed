import { Controller, Get, HttpStatus, Res,Post, Body } from '@nestjs/common';
import { Task, TaskDTO } from 'src/models/db/Task';
import { TaskService } from 'src/services/Task.service';

@Controller('task')
export class TaskController {
    constructor(private service:TaskService) {
        
    }
    @Get('test')
    async test(@Res() response): Promise<void> {
    try {
        return response.status(HttpStatus.OK).json({});
      } catch (err) {
      return response.status(err.status).json(err.response);
     }
    } 
    @Get('getAll/:skip/:limit')
    async getAll(skip:number,limit:number): Promise<TaskDTO[]> {
    try {
        const result= this.service.getAll(skip,limit);
        return result;
      } catch (err) {
         throw err;;
     }
    }
    @Post('save')
    async saveUser(@Body() data: Task[]): Promise<Task[]> {
    try {
        var result= await this.service.preSave(data)
      return result;
     } catch (err) {
        throw err;
     }
    }
}
