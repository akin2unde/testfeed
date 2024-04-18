import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { User } from 'src/models/db/user';
import { ProjectTask, ProjectTaskDTO } from 'src/models/db/project-task';
import { TaskService } from './Task.service';
import { Task, TaskDTO } from 'src/models/db/Task';
import { ObjectState } from 'src/models/operation/object-state';
import { TaskStatus } from 'src/models/db/task-status';
import { TaskType } from 'src/models/db/task-type';

@Injectable()
export class ProjectTaskService extends BaseService<ProjectTask> {
 constructor(@InjectModel('ProjectTask') readonly _entity:Model<ProjectTask>,
 private taskService:TaskService,
 private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
 async getByCode(code:string):Promise<ProjectTaskDTO>
 {
  var found=await super.getOne({code:code}) as ProjectTaskDTO;
  await this.setOtherData([found]);
  return found;
 }
 async getAll(skip:number,limit:number,sortParam:string,sortOrder:string):Promise<ProjectTaskDTO[]>
 {
   var allPrjTsk=await super.getAll(skip,limit,sortParam,sortOrder) as ProjectTaskDTO[];
   await this.setOtherData(allPrjTsk);
   return allPrjTsk;
 }
 async setOtherData(projectTasks:ProjectTaskDTO[])
 {
  for (let index = 0; index < projectTasks.length; index++) {
    const element = projectTasks[index];
    element.taskObjs= await this.taskService.get({code:{$in:element.tasks}}) as TaskDTO[];
    element.taskObjs.forEach(_=>{
      _.previousStatus=_.currentStatus;
    });
  }
 }
 async preSave(data: ProjectTaskDTO)
 {
  const savedTasks= await this.taskService.preSave(data.taskObjs);
  data.tasks=savedTasks.map(m=>{return m.code});
  if(data.state== ObjectState.new){
    data.description= data.taskObjs.map(m=>{return m.name;}).join("\n");
    data.createdBy= this.getActiveUser().mailAddress;
  }
  if(savedTasks.filter(f=>f.currentStatus!= TaskStatus.completed).length==0)
  {
    data.status= TaskStatus.completed;
  }
  const res= await this.save([data]) as ProjectTaskDTO[];
  if(res.length>0)
  {
    res[0].taskObjs= savedTasks.length>0?savedTasks:data.taskObjs;
  }
  else{
    res.push(data);
  }
  return res[0];
 }
 async getUserTaskSummary(email:string):Promise<KeyValue[]>
 {
  const tasks=await this.taskService.get(
    {
      $and:
    [
      {actor:`${email}`},
      {$and:
      [
        // {currentStatus: {$ne:TaskStatus.completed}},
        {currentStatus: {$ne:TaskStatus.abandon}} 
      ]
      }
    ]
  });
  const bugTasks= { key:"Bug", value:tasks.filter(_=>_.taskType== TaskType.bug.toString()).length.toString(),other:'red'} as KeyValue
  const pendingTasks= { key:"Pending", value:tasks.filter(_=>_.currentStatus== TaskStatus.pending.toString()).length.toString(),other:'pink'} as KeyValue
  const completed= { key:"Completed", value:tasks.filter(_=>_.currentStatus== TaskStatus.completed.toString()).length.toString(),other:'primary'} as KeyValue
  const awaiting= { key:"Awaiting", value:tasks.filter(_=>_.currentStatus== TaskStatus.pendingreview.toString()).length.toString(),other:'orange'} as KeyValue
  const projectCount= (await this.taskService._entity.aggregate().sortByCount('project')).length;
  const project = {key:'Projects', value:projectCount.toString(),other:'blue'} as KeyValue;
  return [bugTasks,pendingTasks,completed,awaiting,project]
 }
 
}
