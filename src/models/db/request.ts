import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { FeaturePriority } from "./feature-priority";
import { setCodePrefix } from "../operation/attributes";

@Schema({collection:'Request',timestamps:true,_id:false
})
@setCodePrefix('REQ')
export class Request extends BaseEntity<Request>  {
   /**
    *
    */
   constructor() {
      super();
   }
   @Prop({isRequired:true,trim:true})
   @IsNotEmpty()
   project: string;
   @Prop({isRequired:true})
   @IsNotEmpty()
   createdBy: string;
   @Prop({default:Status.active,enum:Status,type:String})
   status: string;
   @Prop({default:FeaturePriority.lessimportant,type:String, enum:FeaturePriority})
   priority: string;
   @Prop({isRequired:true,trim:true})
   @IsNotEmpty()
   description: string;
   @Prop()
   solution: string;
   @Prop()
   task: string;
   toObject()
   {
      return plainToInstance(Request,{...this['_doc'],id:this['id']})
   }
}
export class RequestDTO extends Request{
   constructor() {
      super();
   }
}
export type RequestDocument = Request & Document;
export const RequestSchema = SchemaFactory.createForClass(Request);
RequestSchema.index({position: '2dsphere' });
RequestSchema.index({project: 1,description:1}, { unique: true });
RequestSchema.index({ '$**': 'text'} );
