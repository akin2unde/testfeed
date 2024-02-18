import { Prop, SchemaFactory } from "@nestjs/mongoose"
import { Expose, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import mongoose, { Document, Schema } from "mongoose";
import { ObjectState } from "../operation/object-state";
export abstract class BaseEntity<T> {
   @Prop({default:new mongoose.Types.ObjectId()})
   _id: String;
   @Type(() => Date)
   @Prop({default:new Date()})
   createdAt: Date;   
   @Prop({default:new Date()})
   @Type(() => Date)
   updatedAt: Date;
   // @IsNotEmpty()
   // @Prop({required:true,index:true})
   // tenant: string;
   state: ObjectState= ObjectState.new;
   protected abstract toObject():T;
}