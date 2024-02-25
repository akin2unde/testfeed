import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTask, ProjectTaskSchema } from 'src/models/db/project-task';
import { ProjectTaskService } from 'src/services/project-task.service';
import { TaskModule } from './task.module';
import { ProjectTaskController } from 'src/controllers/project-task/project-task.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ProjectTask', schema: ProjectTaskSchema }]),
    TaskModule
  ],
  providers: [
    ProjectTaskService
  ],
  controllers: [
    ProjectTaskController
  ],
  exports:[ProjectTaskService]
})
export class ProjectTaskModule {}
