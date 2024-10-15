import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('application.port');
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
