import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import mongoose, { Document } from "mongoose";
import { Exclude, Type, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { TaskStatus } from "./task-status";
import { Task, TaskSchema } from "./Task";

@Schema({collection:'ProjectTask',timestamps:true
})
export class ProjectTask extends BaseEntity<ProjectTask>  {
   @Prop({isRequired:true, type:[{type: mongoose.Schema.Types.ObjectId,ref:()=>Task}],default:[]})
   tasks: Task[];
   @Prop({isRequired:true})
   createdBy: string;
   @Prop({default:new Date()})
   @Type(() => Date)
   startAt:Date;
   @Type(() => Date)
   endAt:Date;
   @Prop({default:TaskStatus.pending,enum:TaskStatus,type:String})
   status: string;
   @Prop()
   closeBy: string;
   @Prop({isRequired:true})
   description: string;
   toObject()
   {
      return plainToInstance(ProjectTask,{...this['_doc'],id:this['id']})
   }
}
export type ProjectTaskDocument = ProjectTask & Document;
export const ProjectTaskSchema = SchemaFactory.createForClass(ProjectTask);
ProjectTaskSchema.index({position: '2dsphere' });
ProjectTaskSchema.index({ '$**': 'text' });
