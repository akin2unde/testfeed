import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, Type, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { ProjectType } from "./project-type";
import { TaskType } from "./task-type";
import { TaskNotification } from "./task-notification";
import { TaskStatus } from "./task-status";

@Schema({collection:'Task',timestamps:true
})
export class Task extends BaseEntity<Task>  {
   @Prop({isRequired:true, unique:true,index:true,trim:true})
   name: string;
   @Prop()
   description: string;
   @Prop({isRequired:true, unique:true,index:true})
   project: string;
   @Prop({isRequired:true})
   @IsEmail()
   actor: string;
   @Prop({})
   @IsEmail()
   createdBy:string
   @Prop({default:ProjectType.frontend, enum:ProjectType,type:String})
   projectType: string;
   @Prop({default:TaskStatus.pending, enum:TaskStatus,type:String})
   currentStatus: TaskStatus;
   @Prop()
   @IsEmail()
   closeBy:string;
   @Type(() => Date)
   startAt:Date;
   @Type(() => Date)
   endAt:Date;
   @Prop()
   notifyAt:number; //for developer or manager:e.g 5mins before end date..work after implementation of cron
   @Prop({default:TaskType.newfeature,enum:TaskType, type:String})
   taskType: string;
   @Prop({default:0.5})
   duration:number;
   @Prop({default:false})
   hasHistory:boolean;//set immediately an history is added
   @Prop({default:[],type:[TaskNotification]})
   taskStatusChangeNotifier:TaskNotification[];
   @Prop({default:true})
   allowPoint:boolean;
   @Prop({default:0})
   taskPoint:number
   toObject()
   {
      return plainToInstance(Task,{...this['_doc'],id:this['id']})
   }
}
export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({position: '2dsphere' });
TaskSchema.index({ '$**': 'text' });
