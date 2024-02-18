import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import mongoose, { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { TaskStatus } from "./task-status";
import { Task } from "./Task";

@Schema({collection:'TaskHistory',timestamps:true
})
export class TaskHistory extends BaseEntity<TaskHistory>  {
   @Prop({isRequired:true, unique:true, type: mongoose.Schema.Types.ObjectId, ref:'Task'})
   task: Task;
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
export type TaskHistoryDocument = TaskHistory & Document;
export const TaskHistorySchema = SchemaFactory.createForClass(TaskHistory);
TaskHistorySchema.index({position: '2dsphere' });
TaskHistorySchema.index({ '$**': 'text' });