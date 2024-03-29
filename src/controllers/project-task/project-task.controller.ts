import { Body, Controller, Get, HttpStatus, Param, Post, Res, UsePipes } from '@nestjs/common';
import { Task } from 'src/models/db/Task';
import { ProjectTask, ProjectTaskDTO } from 'src/models/db/project-task';
import { ModelValidation } from 'src/pipes/model-validation';
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
    @UsePipes(new ModelValidation(ProjectTaskDTO,false))
    async saveUser(@Body() data: ProjectTaskDTO): Promise<ProjectTaskDTO> {
    try {
        var result= await this.service.preSave(data)
        return result;
     } catch (err) {
        throw err;
     }
    }
    @Get('getUserTaskSummary/:email')
    async getUserTaskSummary(@Param() email): Promise<KeyValue[]> {
    try {
        const result= await this.service.getUserTaskSummary(email)
        return result;
      } catch (err) {
         throw err;
     }
    }
}
