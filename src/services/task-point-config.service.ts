import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { User } from 'src/models/db/user';
import { TaskPointConfig } from 'src/models/db/task-point-config';
@Injectable()
export class TaskPointConfigService extends BaseService<TaskPointConfig> {
 constructor(@InjectModel(TaskPointConfig.name) readonly _entity:Model<TaskPointConfig>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
}
