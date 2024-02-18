import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Task } from 'src/models/db/Task';
import { ProjectTask } from 'src/models/db/project-task';
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
    @Post('save')
    async saveUser(@Body() data: ProjectTask): Promise<ProjectTask> {
    try {
        var result= await this.service.preSave(data)
        return result[0];
     } catch (err) {
        throw err;
     }
    }
}
