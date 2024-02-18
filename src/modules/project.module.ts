import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from 'src/controllers/project/project.controller';
import { Project, ProjectSchema } from 'src/models/db/project';
import { ProjectService } from 'src/services/project.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])
  ],
  providers: [
    ProjectService
  ],
  controllers: [
    ProjectController
  ],
  exports:[ProjectService]
})
export class ProjectModule {}
