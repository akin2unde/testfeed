import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskHistoryController } from 'src/controllers/task-history/task-history.controller';
import { TaskHistory, TaskHistorySchema } from 'src/models/db/task-history';
import { TaskHistoryService } from 'src/services/task-history.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name:  'TaskHistory', schema: TaskHistorySchema }])
  ],
  providers: [
    TaskHistoryService
  ],
  controllers: [
    TaskHistoryController
  ],
  exports:[TaskHistoryService]
})
export class TaskHistoryModule {}
