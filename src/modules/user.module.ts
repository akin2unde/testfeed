import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/db/user';
//MongooseModule.forRoot('mongodb://<username>:<password>@localhost:27017',{dbName: 'studentdb'})
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [
    UserService
  ],
  exports:[UserService]
})
export class UserModule {}
