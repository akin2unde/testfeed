import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsyncLocalStorage } from 'async_hooks';
import { Project } from 'src/models/db/project';
import { User } from 'src/models/db/user';
import { Request } from 'src/models/db/request';

@Injectable()
export class RequestService extends BaseService<Request> {
 constructor(@InjectModel('Request') readonly _entity:Model<Request>,private readonly _store: AsyncLocalStorage<User>) 
 {
  super(_entity,_store);
 }

}
