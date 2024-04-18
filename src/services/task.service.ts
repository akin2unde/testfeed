import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { Project } from 'src/models/db/project';
import { User } from 'src/models/db/user';
import { Task, TaskDTO } from 'src/models/db/task';
import { TaskHistory } from 'src/models/db/task-history';
import { ObjectState } from 'src/models/operation/object-state';
import { TaskStatus } from 'src/models/db/task-status';
import { TaskHistoryService } from './task-history.service';
import { TaskType } from 'src/models/db/task-type';

@Injectable()
export class TaskService extends BaseService<Task> {
 constructor(@InjectModel( 'Task') readonly _entity:Model<Task>,
 private taskHistoryService:TaskHistoryService,
 private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
 async preSave(data:TaskDTO[])
 {
   await this.updateHistory(data);
   const res= await this.save(data) as TaskDTO[];
   res.forEach(_=>{
    _.previousStatus= _.currentStatus;
   });
   return res;
 }
 async updateHistory(data:TaskDTO[])
 {
  const histories:TaskHistory[]=[];
  data.forEach(f=>{
    if(f.state== ObjectState.changed && f.currentStatus!=f.previousStatus)
    {
      let history= new  TaskHistory();
      history.actor= this.getActiveUser().mailAddress;
      history.state= ObjectState.new;
      history.task= f.code;
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
  await this.taskHistoryService.save(histories);
 }
}
