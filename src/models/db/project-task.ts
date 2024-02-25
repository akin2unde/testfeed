import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, ValidateNested, isNotEmpty } from "class-validator";
import mongoose, { Document } from "mongoose";
import { Exclude, Type, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { TaskStatus } from "./task-status";
import { Task, TaskDTO, TaskSchema } from "./Task";
import { setCodePrefix } from "../operation/attributes";

@Schema({collection:'ProjectTask',timestamps:true,_id:false
})
@setCodePrefix('PTK')
export class ProjectTask extends BaseEntity<ProjectTask>{
   constructor() {
      super();
      // this.codePrefix='PTK';
   }
   @Prop({isRequired:true,default:[]})
   tasks: string[];
   @Prop({isRequired:true})
   createdBy: string;
   @Prop({default:new Date()})
   @Type(() => Date)
   startAt:Date;
   @Type(() => Date)
   endAt:Date;
   @Prop({default:TaskStatus.pending,enum:TaskStatus,type:String})
   status: TaskStatus;
   @Prop()
   closeBy: string;
   @Prop({isRequired:true})
   description: string;
   // toObject()
   // {
   //    return plainToInstance(ProjectTask,{...this['_doc'],id:this['id']})
   // }
}
export class ProjectTaskDTO extends ProjectTask{
   @ValidateNested({ each: true })
   @Type(() => TaskDTO)
   taskObjs: Task[]=[];
   /**
    *
    */
   constructor() {
      super();
      
   }
}
export type ProjectTaskDocument = ProjectTask & Document;
export const ProjectTaskSchema = SchemaFactory.createForClass(ProjectTask);
ProjectTaskSchema.index({position: '2dsphere' });
ProjectTaskSchema.index({ '$**': 'text',code: 1 }, { unique: true } );
