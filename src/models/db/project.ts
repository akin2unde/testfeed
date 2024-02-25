import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
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
   @Prop({isRequired:true, unique:true,index:true,trim:true})
   name: string;
   @Prop({isRequired:true})
   createdBy: string;
   @Prop({default:Status.active, enum:Status, type:String})
   status: string;
   @Prop({default:ProjectType.full,enum:ProjectType,type:String})
   projectType: string;
   @Prop()
   description: string;
   toObject()
   {
      return plainToInstance(Project,{...this['_doc'],id:this['id']})
   }
}
export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({position: '2dsphere' });
ProjectSchema.index({ '$**': 'text',code: 1 }, { unique: true });
