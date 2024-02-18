import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { User } from 'src/models/db/user';
import { ProjectTask } from 'src/models/db/project-task';

@Injectable()
export class ProjectTaskService extends BaseService<ProjectTask> {
 constructor(@InjectModel(ProjectTask.name) readonly _entity:Model<ProjectTask>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
}
