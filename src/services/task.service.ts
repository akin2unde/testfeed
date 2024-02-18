import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { Project } from 'src/models/db/project';
import { User } from 'src/models/db/user';
import { Task } from 'src/models/db/task';
import { TaskHistory } from 'src/models/db/task-history';
import { ObjectState } from 'src/models/operation/object-state';
import { TaskStatus } from 'src/models/db/task-status';
import { TaskHistoryService } from './task-history.service';

@Injectable()
export class TaskService extends BaseService<Task> {
 constructor(@InjectModel(Task.name) readonly _entity:Model<Task>,
 private taskHistoryService:TaskHistoryService,
 private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
 async preSave(data:Task[])
 {
   const histories:TaskHistory[]=[];
   data.forEach(f=>{
      if(f.state!= ObjectState.unchanged)
      {
        const history= {} as TaskHistory;
        history.actor= this.activeUser.mailAddress;
        history.state= ObjectState.new;
        history.task= f;
        history.taskStatus
        history.taskStatus= f.currentStatus;
        history.description=`Task is now ${f.currentStatus} by ${history.actor}`;
        histories.push(history);
      }
      if(f.currentStatus!= TaskStatus.pending)
      {
        f.hasHistory=true;
      }
   });
   const res= await this.saveMany(data);
   await this.taskHistoryService.saveMany(histories);
   return res;
 }

}
