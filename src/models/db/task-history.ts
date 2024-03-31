import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import mongoose, { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { TaskStatus } from "./task-status";
import { Task, TaskDTO } from "./Task";
import { setCodePrefix } from "../operation/attributes";

@Schema({collection:'TaskHistory',timestamps:true,_id:false
})
@setCodePrefix('TSH')
export class TaskHistory extends BaseEntity<TaskHistory>  {
   constructor() {
      super();
   }
   @Prop({isRequired:true})
   task: string;
   @Prop({isRequired:true})
   actor: string;
   @Prop({default:TaskStatus.pending,enum:TaskStatus, type:String})
   taskStatus: string;
   @Prop()
   description: string;
   toObject()
   {
      return plainToInstance(TaskHistory,{...this['_doc'],id:this['id']})
   }
}
export class TaskHistoryDTO extends TaskHistory  {
   taskObj?:TaskDTO;
}
export type TaskHistoryDocument = TaskHistory & Document;
export const TaskHistorySchema = SchemaFactory.createForClass(TaskHistory);
TaskHistorySchema.index({position: '2dsphere' });
TaskHistorySchema.index({ '$**': 'text' ,code: 1 }, { unique: true });
