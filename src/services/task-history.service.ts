import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { User } from 'src/models/db/user';
import { TaskHistory, TaskHistoryDocument } from 'src/models/db/task-history';

@Injectable()
export class TaskHistoryService extends BaseService<TaskHistory> {
 constructor(@InjectModel('TaskHistory') readonly _entity:Model<TaskHistoryDocument>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
}
