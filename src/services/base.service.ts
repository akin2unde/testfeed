import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { AsyncLocalStorage } from 'async_hooks';
import {  } from 'class-transformer';
import { Document, FilterQuery, FlattenMaps, Model } from 'mongoose';
import { ErrorHandler } from 'src/middleware/error';
import { BaseEntity } from 'src/models/db/base-model';
import { User } from 'src/models/db/user';
import { ObjectState } from 'src/models/operation/object-state';

@Injectable()
export abstract class BaseService<T> {
  /**
   *
   */
  private activeUser:User;
  constructor(private readonly entity:Model<T>,  private readonly store: AsyncLocalStorage<User>) 
  {
    
  }
  /**
   *
   */
 private docToObj(docs:T[])
 {
   const result = docs.map((m:any)=>
   { 
    const obj=m.toJSON ===undefined?m: m.toJSON();
    delete obj.__v; 
    obj.state=ObjectState.unchanged; return obj
  });
   return result;
 }
  getActiveUser()
  {
    this.activeUser= this.store?this.store.getStore():null;
    return this.activeUser
  }
  async getAll(skip=0,limit=20,sortParam:string="createdAt",sortOrder:string='desc'):Promise<T[]>{
    const sortO= sortOrder=='desc'?-1:1;
    var result= await this.entity.find().sort({sortParam:sortO}).skip(skip).limit(limit);
    result= this.docToObj(result);
    return result
  }
  async count(conditions:FilterQuery<T>):Promise<number>{
    const res=  await this.entity.countDocuments(conditions as FilterQuery<T>);
    return res[0].countResult;
  }
  async countWithPaging(conditions:FilterQuery<T>,skip:number=0,limit:number=20):Promise<number>{
    const res=  await this.entity.aggregate([{$match:conditions},{$skip:skip},{$limit:limit},{$count:'countResult'}]);  //.countDocuments(conditions as FilterQuery<T>);
    return res[0].countResult;
  }
  async get(conditions:FilterQuery<T>,skip=0,limit=20,sortParam:string="createdAt",sortOrder:string|number='desc', projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T[]>{
    const sortO= sortOrder=='desc'?-1:1;
    var result= await this.entity.find(conditions as FilterQuery<T>,projection,options).sort({sortParam:sortO}).skip(skip).limit(limit);
    result= this.docToObj(result);
    return result;
  }
  async getSimple(conditions:Partial<Record<keyof T,unknown>>,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T[]>{
    return await this.entity.find(conditions as FilterQuery<T>,projection,options);
  }
  async getOne(conditions:Partial<Record<keyof T,unknown>>,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T>{
    var result= await this.entity.findOne(conditions as FilterQuery<T>,projection,options);
    const objToJson= (result as any).toJSON() ;
    objToJson.state=ObjectState.unchanged;
    delete objToJson.__v;  
    return objToJson;
  }
  async getOneById(id:string):Promise<T>
  {
    var result= await this.entity.findById(id);
    const objToJson= (result as any).toJSON() ;
    objToJson.state=ObjectState.unchanged;
    delete objToJson.__v;  
    return objToJson;
  }
   async save(data:T[]):Promise<T[]>
  {
    const newObjs=(data as any[]).filter(_=>_.state== ObjectState.new || !_.state);
    const updateObjs=(data as any[]).filter(_=>_.state && _.state== ObjectState.changed);
    const deleteObjs=(data as any[]).filter(_=>_.state && _.state== ObjectState.removed);
    const saveRes=await this.saveMany(newObjs as T[]);
    if(updateObjs.length>0)
    await this.updateMany(updateObjs);
    if(deleteObjs.length>0)
    await this.deleteMany(deleteObjs);
    const res= saveRes.concat(updateObjs).concat(deleteObjs);
    var result= this.docToObj(res);
    return result;
  }

  private async saveMany(data:T[]):Promise<T[]>
  {
    this.setCode(data);
    try{
    var result= await this.entity.insertMany(data,{ lean: true });
    return result;
    }
    catch(err)
    {
       throw new HttpException(err,500)
    }
  }
  setCode(data:T[])
  {
    data.forEach(f=>{
      (f as any).code=`${(f as any).codePrefix}-${this.generate6DigitCode()}`;
      // console.log(T['codePrefix']);
    });
  }
  generate6DigitCode()
  {
   return Math.floor(1000000000 + Math.random() * 9000000000);
  }
  async updateMany(data:T[]):Promise<void>{
    for (let index = 0; index < data.length; index++) {
      const el= data[index];
      var res=await this.entity.replaceOne({code:(el as any).code},el);
    }
  }
  async deleteMany(data:T[]):Promise<void>{
    for (let index = 0; index < data.length; index++) {
      const el= data[index];
      this.entity.deleteOne({code:(el as any).code},el);
    }
   }
}
