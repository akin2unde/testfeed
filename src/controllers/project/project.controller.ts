import { Controller, Get,Post, HttpStatus, Res, Body, UsePipes } from '@nestjs/common';
import { Project, ProjectDTO } from 'src/models/db/project';
import { ProjectTaskDTO } from 'src/models/db/project-task';
import { ModelValidation } from 'src/pipes/model-validation';
import { ProjectService } from 'src/services/project.service';

@Controller('project')
export class ProjectController {
    constructor(private service:ProjectService) {
        
    }
    @Get('test')
    async test(@Res() response): Promise<void> {
    try {
        return response.status(HttpStatus.OK).json({});
      } catch (err) {
      return response.status(err.status).json(err.response);
     }
    } 
    @Get('getAll/:skip/:limit/:sortParam?/:sortOrder?')
    async getAll(@Res() response,skip:number,limit:number,sortParam:string,sortOrder:string): Promise<Project[]> {
    try {
        const result=await this.service.getAll(skip,limit,sortParam,sortOrder);
        return response.json(result);
      } catch (err) {
         throw err;;
     }
    }

    @Post('save')
    @UsePipes(new ModelValidation(Project))
    async saveUser(@Body() data: ProjectDTO[]): Promise<ProjectDTO[]> {
    try {
        var result= await this.service.save(data)
        return result;
     } catch (err) {
        throw err;
     }
    }
}
