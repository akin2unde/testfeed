import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizeMiddleware } from 'src/middleware/authorize';
import { UserModule } from './user.module';
import { StoreModule } from './utils/store.module';
import { TaskModule } from './task.module';
import { TaskHistory } from 'src/models/db/task-history';
import { FeatureModule } from './feature.module';
import { ProjectTaskModule } from './project-task.module';
import { ProjectModule } from './project.module';
//MongooseModule.forRoot('mongodb://<username>:<password>@localhost:27017',{dbName: 'studentdb'})
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'Ticketing'}),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      // load: [envConfig],
    }),
    AuthModule,
    UserModule,
    StoreModule,
    TaskModule,
    TaskHistory,
    FeatureModule,
    ProjectTaskModule,
    ProjectModule
  ],
  controllers: [
  ],
  providers: [
// UserService
  ],
})
export class AppModule implements NestModule {
  //   constructor(
  //   // inject the AsyncLocalStorage in the module constructor,
  //   private readonly als: AsyncLocalStorage
  // ) {}
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthorizeMiddleware).forRoutes('*')
            // .apply((req, res, next) => {
            //   // populate the store with some default values
            //   // based on the request,
            //   const store = {
            //     userId: req.headers['x-user-id'],
            //   };
            //   // and pass the "next" function as callback
            //   // to the "als.run" method together with the store.
            //   this.als.run(store, () => next());
            // })
            // // and register it for all routes (in case of Fastify use '(.*)')
            // .forRoutes('*');
  }



}
