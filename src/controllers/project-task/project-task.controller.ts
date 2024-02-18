import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ProjectTaskService } from 'src/services/project-task.service';

@Controller('project-task')
export class ProjectTaskController {
    constructor(private service:ProjectTaskService) {
        
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
