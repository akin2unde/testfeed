import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTask, ProjectTaskSchema } from 'src/models/db/project-task';
import { ProjectTaskService } from 'src/services/project-task.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProjectTask.name, schema: ProjectTaskSchema }])
  ],
  providers: [
    ProjectTaskService
  ],
  exports:[ProjectTaskService]
})
export class ProjectTaskModule {}
