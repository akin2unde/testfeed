import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
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
}
