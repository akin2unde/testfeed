import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/db/user';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class UserService extends BaseService<User> {
 constructor(@InjectModel( 'User') readonly _entity:Model<User>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }
}
