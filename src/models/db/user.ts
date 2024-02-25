import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseEntity } from "./base-model";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Exclude, Type, plainToInstance } from "class-transformer";
import { Status } from "./status";
import { setCodePrefix } from "../operation/attributes";

@Schema({collection:'User',timestamps:true,_id:false
})
@setCodePrefix('USR')
export class User extends BaseEntity<User>  {
   constructor() {
      super();
   }
   @Prop({isRequired:true})
   @IsNotEmpty()
   @Type(() => String)
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
   toObject()
   {
      return plainToInstance(User,{...this['_doc'],id:this['id']})
   }
}
export class UserDTO extends User  {
   token?:string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({position: '2dsphere' });
UserSchema.index({ '$**': 'text' ,mailAddress:1 }, { unique: true });
