import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ProjectService } from 'src/services/project.service';
import { TaskHistoryService } from 'src/services/task-history.service';

@Controller('task-history')
export class TaskHistoryController {
    constructor(private service:TaskHistoryService) {
        
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
