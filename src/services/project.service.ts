import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { Project } from 'src/models/db/project';
import { User } from 'src/models/db/user';

@Injectable()
export class ProjectService extends BaseService<Project> {
 constructor(@InjectModel('Project') readonly _entity:Model<Project>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
 async save(data: Project[]): Promise<any[]>
 {
    data.forEach(_=>{
        _.createdBy= this.getActiveUser().mailAddress;
    });
    return await super.save(data);
 }
}
