import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
//MongooseModule.forRoot('mongodb://<username>:<password>@localhost:27017',{dbName: 'studentdb'})
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: '8788876',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ],
})
export class AuthModule {}
