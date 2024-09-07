import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './config/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('EasyTracker')
    .setDescription('The EasyTracker API description')
    .setVersion('1.0')
    .addTag('03.11.29')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
  await app.listen(3000);
  console.log('Start server on port 3000');
  console.log('Start swagger on port 3000/swagger');
}
bootstrap();
