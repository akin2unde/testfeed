import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, Transform, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { ProjectType } from "./project-type";
import { setCodePrefix } from "../operation/attributes";

@Schema({collection:'Project',timestamps:true,_id:false
})
@setCodePrefix('PRJ')

export class Project extends BaseEntity<Project>  {
   constructor() {
      super();
   }
   @Prop({isRequired:true, unique:true,trim:true})
   @IsNotEmpty()
   name: string;
   @Prop({isRequired:true})
   @IsNotEmpty()
   createdBy: string;
   @Prop({default:Status.active, enum:Status, type:String})
   status: string;
   @Prop({default:ProjectType.full,enum:ProjectType,type:String})
   projectType: string;
   @Prop()
   // @Transform(value=>{return !value && })
   description: string;
   toObject()
   {
      return plainToInstance(Project,{...this['_doc'],id:this['id']})
   }
}
export class ProjectDTO extends Project  {
  
}
export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({position: '2dsphere' });
ProjectSchema.index({ '$**': 'text',name: 1 }, { unique: true });
