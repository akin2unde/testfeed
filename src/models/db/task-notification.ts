import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
import { TaskStatus } from "./task-status";
//sub doc
@Schema({_id:false,timestamps:true})
export class TaskNotification {
   @Prop({default:TaskStatus.pending,enum:TaskStatus,type:String})
   taskStatus: string;
   @Prop({default:[]})
   users: string[];
   // toObject()
   // {
   //    return plainToInstance(TaskNotification,{...this['_doc'],id:this['id']})
   // }
}
// export type TaskNotificationDocument = TaskNotification & Document;
// export const TaskNotificationSchema = SchemaFactory.createForClass(TaskNotification);
// TaskNotificationSchema.index({position: '2dsphere' });
// TaskNotificationSchema.index({ '$**': 'text' });
