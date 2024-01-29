import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors:
      process.env.ENABLE_CORS.toLowerCase() == 'true' &&
      process.env.NODE_ENV.toLowerCase() == 'development',
  });
  app.setGlobalPrefix('events-schedule');

  await app.listen(process.env.PORT);
}
bootstrap();
