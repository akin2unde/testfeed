import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Document, FilterQuery, Model } from 'mongoose';
import { BaseEntity } from 'src/models/db/base-model';
import { User } from 'src/models/db/user';
import { ObjectState } from 'src/models/operation/object-state';

@Injectable()
export abstract class BaseService<T> {
  /**
   *
   */
  activeUser:User;
  constructor(private readonly entity:Model<T>,  private readonly store: AsyncLocalStorage<User>) 
  {
    this.activeUser= store?store.getStore()?.toObject():null;
  }
  /**
   *
   */
 

  async getOne(conditions:Partial<Record<keyof T,unknown>>,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T>{
    return await this.entity.findOne(conditions as FilterQuery<T>,projection,options);
  }
  async getOneById(id:string,projection:string|Record<string,unknown>={},options:Record<string,unknown>={}):Promise<T>{
    return await this.entity.findById(id);
  }
  async save(data:T[])
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

  async saveMany(data:T[]):Promise<T[]>{
    return await this.entity.insertMany(data);
  }
  async updateMany(data:T[]):Promise<void>{
     await this.entity.updateMany(data);
  }
  async deleteMany(data:T[]):Promise<void>{
    await this.entity.deleteMany(data);
 }
}
