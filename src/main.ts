import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(session());
  await app.listen(3000);
}
bootstrap();
