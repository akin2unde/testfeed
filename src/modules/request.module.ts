import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from 'src/controllers/request/request.controller';
import { RequestSchema } from 'src/models/db/request';
import { RequestService } from 'src/services/request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:'Request', schema: RequestSchema }])
  ],
  providers: [
    RequestService
  ],
  controllers: [
    RequestController
  ],
  exports:[RequestService]
})
export class RequestModule {}
