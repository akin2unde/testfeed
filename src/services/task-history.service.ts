import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { Project } from 'src/models/db/project';
import { User } from 'src/models/db/user';
import { Task } from 'src/models/db/task';
import { TaskHistory } from 'src/models/db/task-history';

@Injectable()
export class TaskHistoryService extends BaseService<TaskHistory> {
 constructor(@InjectModel(TaskHistory.name) readonly _entity:Model<TaskHistory>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
}
