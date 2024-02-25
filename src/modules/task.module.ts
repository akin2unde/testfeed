import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/models/db/Task';
import { TaskService } from 'src/services/Task.service';
import { TaskHistoryModule } from './task-history.module';
import { TaskController } from 'src/controllers/task/task.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema, }]),
    TaskHistoryModule
  ],
  providers: [
    TaskService
  ],
  controllers: [
    TaskController
  ],
  exports:[TaskService]
})
export class TaskModule {}
