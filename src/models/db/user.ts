import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, plainToInstance } from "class-transformer";
import { Status } from "./status";

@Schema({collection:'User',timestamps:true
})
export class User extends BaseEntity<User>  {
   @Prop({isRequired:true})
   @IsNotEmpty()
   name: string;
   @Prop()
   password: string;
   @Prop({isRequired:true, unique:true,index:true,trim:true})
   @IsEmail()
   mailAddress: string;//@IsNumberString()
   @Prop({default:0})
   taskPoints:number;
   @Prop({default:Status.active,enum:Status, type:String})
   status: string;
   token?:string;
   toObject()
   {
      return plainToInstance(User,{...this['_doc'],id:this['id']})
   }
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({position: '2dsphere' });
UserSchema.index({ '$**': 'text' });
