import { Controller, Res,Get, HttpStatus } from '@nestjs/common';
import { FeatureService } from 'src/services/feature.service';

@Controller('feature')
export class FeatureController {
    constructor(private service:FeatureService) {
        
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
