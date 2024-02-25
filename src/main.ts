import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './middleware/logger';
import { ErrorHandler } from './middleware/error';
import { AuthorizeMiddleware } from './middleware/authorize';
import { UserDTO } from './models/db/user';
import { ModelValidation } from './pipes/model-validation';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //   }),
  // );
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new EntityTransform());
  // app.useGlobalPipes(new ModelValidation());
  // app.useGlobalPipes(new ValidationPipe({     whitelist: true,
  //   forbidNonWhitelisted: true,
  //   forbidUnknownValues: true,
  //   transform: true,
  //   transformOptions: {
  //     enableImplicitConversion: true,
  //   }, }));
  app.use(logger);
  app.useGlobalFilters(new ErrorHandler());
  await app.listen(8000);
}
bootstrap();
