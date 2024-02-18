import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskHistory, TaskHistorySchema } from 'src/models/db/task-history';
import { TaskHistoryService } from 'src/services/task-history.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskHistory.name, schema: TaskHistorySchema }])
  ],
  providers: [
    TaskHistoryService
  ],
  exports:[TaskHistoryService]
})
export class TaskHistoryModule {}
