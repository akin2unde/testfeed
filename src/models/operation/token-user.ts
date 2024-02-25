import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenUser{
 mailAddress:string;
 tenant:string;
 code:string
 /**
  *
  */
 constructor(_mail:string,code:string) {
    this.mailAddress= _mail;
    this.code=code;
 }
}