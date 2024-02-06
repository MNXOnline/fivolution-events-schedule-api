import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/**
 * @description App bootstrap with cors enabled on development mode
 * @author Mannix Manglani
 * @date 18/01/2024
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors:
      process.env.ENABLE_CORS.toLowerCase() == 'true' &&
      process.env.NODE_ENV.toLowerCase() == 'development',
  });
  // app.setGlobalPrefix('events-schedule');

  await app.listen(process.env.PORT);
}
bootstrap();
