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
   const histories:TaskHistory[]=[];
   const res= await this.saveMany(data);
    res.forEach(f=>{
      if(f.state!= ObjectState.unchanged)
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
   await this.taskHistoryService.saveMany(histories);
   return res;
 }
  // setCode(data: Task[]): void
  // {
  //   data.forEach(f=>{
  //     (f as any).code=`${(f as any).codePrefix}-${this.generate6DigitCode()}`;
  //     console.log(f);
  //   });
  // }

}
