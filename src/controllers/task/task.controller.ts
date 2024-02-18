import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
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
}
