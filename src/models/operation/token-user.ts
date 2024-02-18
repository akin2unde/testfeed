import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenUser{
 mailAddress:string;
 tenant:string;
 _id:string
 /**
  *
  */
 constructor(_mail:string,_tenant:string,_id:string) {
    this.tenant=_tenant;
    this.mailAddress= _mail;
    this._id=_id;
 }
}