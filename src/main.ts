import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { delay } from 'src/middleware/delay.middleware';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(delay);
  app.use(helmet());
  app.enableCors({
    origin: ['http://example.com'],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
