import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { FeaturePriority } from "./feature-priority";

@Schema({collection:'Feature',timestamps:true
})
export class Feature extends BaseEntity<Feature>  {
   @Prop({isRequired:true, unique:true,index:true,trim:true})
   project: string;
   @Prop({isRequired:true})
   createdBy: string;
   @Prop({default:Status.active,enum:Status,type:String})
   status: string;
   @Prop({default:FeaturePriority.lessimportant,type:String, enum:FeaturePriority})
   priority: string;
   @Prop({isRequired:true, unique:true,index:true,trim:true})
   description: string;
   toObject()
   {
      return plainToInstance(Feature,{...this['_doc'],id:this['id']})
   }
}
export type FeatureDocument = Feature & Document;
export const FeatureSchema = SchemaFactory.createForClass(Feature);
FeatureSchema.index({position: '2dsphere' });
FeatureSchema.index({ '$**': 'text' });
