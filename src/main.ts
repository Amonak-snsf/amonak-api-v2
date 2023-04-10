/* eslint-disable prettier/prettier */
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';

async function bootstrap() {

const httpsOptions = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem'),
};

  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {httpsOptions});
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Amonak API')
    .setDescription('API for amonak project')
    .setVersion('1.0')
    .addBearerAuth({ 
      description: `Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    }, 'accessToken')
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

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v2',
  });
  await app.listen(process.env.APP_PORT, ()=>{
    console.log(`app start on : ${process.env.API_URL}`)
  });
}
bootstrap();

