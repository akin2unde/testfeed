import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskPointConfig, TaskPointConfigSchema } from 'src/models/db/task-point-config';
import { TaskPointConfigService } from 'src/services/task-point-config.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskPointConfig.name, schema: TaskPointConfigSchema }])
  ],
  providers: [
    TaskPointConfigService
  ],
  exports:[TaskPointConfigService]
})
export class TaskPointConfigModule {}
