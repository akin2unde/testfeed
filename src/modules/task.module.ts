import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/models/db/Task';
import { TaskService } from 'src/services/Task.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
  ],
  providers: [
    TaskService
  ],
  exports:[TaskService]
})
export class TaskModule {}
