import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { AsyncLocalStorage } from 'async_hooks';
import {  } from 'class-transformer';
import { Document, FilterQuery, Model } from 'mongoose';
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
  getActiveUser()
  {
    this.activeUser= this.store?this.store.getStore():null;
    return this.activeUser
  }
  async getAll(skip=0,limit=20):Promise<T[]>{
    return await this.entity.find();
  }
  async count(conditions:FilterQuery<T>):Promise<number>{
    return await this.entity.countDocuments(conditions as FilterQuery<T>);
  }
  async get(conditions:FilterQuery<T>,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T[]>{
    return await this.entity.find(conditions as FilterQuery<T>,projection,options);
  }
  async getSimple(conditions:Partial<Record<keyof T,unknown>>,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T[]>{
    return await this.entity.find(conditions as FilterQuery<T>,projection,options);
  }
  async getOne(conditions:Partial<Record<keyof T,unknown>>,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T>{
    return await this.entity.findOne(conditions as FilterQuery<T>,projection,options);
  }
  async getOneById(id:string,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T>{
    return await this.entity.findById(id);
  }
  private async save(data:T[])
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
    return res.map((m:any)=>{m.state=ObjectState.unchanged; return  m.toObject()});
  }

  async saveMany(data:T[]):Promise<T[]>
  {
    this.setCode(data);
    try{
    return await this.entity.insertMany(data);
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
     await this.entity.updateMany(data);
  }
  async deleteMany(data:T[]):Promise<void>{
    await this.entity.deleteMany(data);
 }
}
