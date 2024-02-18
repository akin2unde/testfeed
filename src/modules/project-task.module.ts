import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTask, ProjectTaskSchema } from 'src/models/db/project-task';
import { ProjectTaskService } from 'src/services/project-task.service';
import { TaskModule } from './task.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProjectTask.name, schema: ProjectTaskSchema }]),
    TaskModule
  ],
  providers: [
    ProjectTaskService
  ],
  exports:[ProjectTaskService]
})
export class ProjectTaskModule {}
