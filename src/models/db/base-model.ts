import { Prop, SchemaFactory } from "@nestjs/mongoose"
import { Exclude, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import mongoose, { Document, Schema } from "mongoose";
import { ObjectState } from "../operation/object-state";
export abstract class BaseEntity<T> {
   @Prop({default:()=> { return new mongoose.Types.ObjectId()}})
   _id: string;
   @Type(() => Date)
   @Prop({default:new Date()})
   createdAt: Date;   
   @Prop({default:new Date()})
   @Type(() => Date)
   updatedAt: Date;
   @Prop({required:true,index:true})
   code:string;
   // @IsNotEmpty()
   // @Prop({required:true,index:true})
   // tenant: string;
   state: ObjectState= ObjectState.new;
   @Exclude()
   codePrefix:string;
   // protected abstract toObject():T;


}
