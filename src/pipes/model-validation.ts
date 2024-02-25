import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform, Type } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import {   plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Connection } from "mongoose";
import { ErrorResponse } from "src/models/operation/error-response";

@Injectable()
export class ModelValidation implements PipeTransform {
   /**
    *
    */
   constructor(private type:any=null,private isArray:boolean=true)
   {
    
   }
  async transform(value: any, metatype: ArgumentMetadata) {
 
    if(!this.type && Array.isArray(value))
    {
      throw new BadRequestException({message:'Specify type for body array', statusCode:500} as ErrorResponse)
    }
    if(this.isArray && !Array.isArray(value))
    {
      throw new BadRequestException({message:'Validation error:Body Array expected', statusCode:400} as ErrorResponse)
    }
    if(Array.isArray(value))
    {
      // var t= typeof value
      // console.log(type)
    }
    try{
    const obj =plainToInstance(this.type, value) ;
    const errors =  await validate(obj); //Array.isArray(object)?await Promise.all(object.map(d => validate(d))):
    if (errors.length > 0) {
      var errorsss= this.getAllConstraints(errors);
      throw new BadRequestException({message:'Validation error:'+errorsss.join(' - '), statusCode:400} as ErrorResponse)
    }
    return obj;
  }
  catch(err)
  {
      throw err;
  }
  }
  getAllConstraints(errors: ValidationError[]): string[] {
    const constraints: string[] = [];
  
    for (const error of errors) {
      if (error.constraints) {
        const constraintValues = Object.values(error.constraints);
        constraints.push(...constraintValues);
      }
  
      if (error.children) {
        const childConstraints = this.getAllConstraints(error.children);
        constraints.push(...childConstraints);
      }
    }
  
    return constraints;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}