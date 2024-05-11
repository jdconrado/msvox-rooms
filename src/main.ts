import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { APP_VARIABLES } from '@config/app-variables.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = new DocumentBuilder()
    .setTitle('Mediasoup NESTJS API')
    .setDescription('The mediasoup nestjs API description')
    .setVersion('1.0')
    .addTag('mediasoup')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const appSettings = APP_VARIABLES;
  const logger = new Logger('bootstrap');
  logger.warn(
    `Application is running on: ${appSettings.NODE_ENV} mode - ${appSettings.APP_URL}:${appSettings.APP_PORT}`,
  );

  await app.listen(appSettings.APP_PORT);
}
bootstrap();
