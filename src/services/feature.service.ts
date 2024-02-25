import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { Project } from 'src/models/db/project';
import { User } from 'src/models/db/user';
import { Task } from 'src/models/db/task';
import { Feature } from 'src/models/db/feature';

@Injectable()
export class FeatureService extends BaseService<Feature> {
 constructor(@InjectModel( 'Feature') readonly _entity:Model<Feature>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }

}
