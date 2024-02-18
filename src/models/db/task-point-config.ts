import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
import { Status } from "./status";

@Schema({collection:'TaskPointConfig',timestamps:true
})
export class TaskPointConfig extends BaseEntity<TaskPointConfig>  {
   @Prop({isRequired:true,default:1})
   minPoint: number;
   @Prop({isRequired:true,default:5}) //max point only if duration is more than 5hrs
   maxPoint: number;
   @Prop({default:Status.active,enum:Status,type:String})
   status: string;
   @Prop({default:1})
   deductPoint: number;
   @Prop({default:2})
   deductPointAfterDuration: number;// deduct (deductPoint) point vlue after e.g 2hrs after the expected completion time
   
   toObject()
   {
      return plainToInstance(TaskPointConfig,{...this['_doc'],id:this['id']})
   }
}
export type TaskPointConfigDocument = TaskPointConfig & Document;
export const TaskPointConfigSchema = SchemaFactory.createForClass(TaskPointConfig);
TaskPointConfigSchema.index({position: '2dsphere' });
TaskPointConfigSchema.index({ '$**': 'text' });
