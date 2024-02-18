import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { User } from 'src/models/db/user';
import { ProjectTask } from 'src/models/db/project-task';
import { TaskService } from './Task.service';
import { Task } from 'src/models/db/Task';
import { ObjectState } from 'src/models/operation/object-state';

@Injectable()
export class ProjectTaskService extends BaseService<ProjectTask> {
 constructor(@InjectModel(ProjectTask.name) readonly _entity:Model<ProjectTask>,
 private taskService:TaskService,
 private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
 async preSave(data: ProjectTask)
 {
  const res= await this.saveMany([data]);
  const savedTasks= await this.taskService.saveMany(data.tasks);
  return res;
 }
 
}
