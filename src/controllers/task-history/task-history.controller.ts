import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { TaskHistoryDTO } from 'src/models/db/task-history';
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
    @Get('getAll/:skip/:limit')
    async getAll(skip:number,limit:number): Promise<TaskHistoryDTO[]> {
    try {
        const result= this.service.getAll(skip,limit);
        return result;
      } catch (err) {
         throw err;;
     }
    } 
}
