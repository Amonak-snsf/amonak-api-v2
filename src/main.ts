import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();
  //app.use(csurf());
  //app.useGlobalPipes(new ValidationPipe({
    //whitelist: false,
    //transform: true,
  //}));
  
  const config = new DocumentBuilder()
    .setTitle('Amonak API')
    .setDescription('API for amonak project')
    .setVersion('1.0')
    .addTag('amonak-home')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  //even after refreshing the page bearer token persist
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Amonak APIs REST',
  };
  SwaggerModule.setup('api', app, document, customOptions);
  
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.APP_PORT);
}
bootstrap();

