import { Controller, Res,Get, HttpStatus, Post, Body, UsePipes } from '@nestjs/common';
import { Feature, FeatureDTO } from 'src/models/db/feature';
import { ModelValidation } from 'src/pipes/model-validation';
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
    @Post('save')
    @UsePipes(new ModelValidation(FeatureDTO))
    async saveUser(@Body() data: FeatureDTO[]): Promise<FeatureDTO[]> {
    try {
        var result= await this.service.save(data)
        return result;
     } catch (err) {
        throw err;
     }
    } 
    @Get('getAll')
    async getAll(@Res() response): Promise<FeatureDTO[]> {
    try {
        const result= await this.service.getAll();
        return response.status(HttpStatus.OK).json(result);
     } catch (err) {
        throw err;
     }
    }
}
