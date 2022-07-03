"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const customOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'Amonak APIs REST',
    };
    swagger_1.SwaggerModule.setup('api', app, document, customOptions);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'static'));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        prefix: 'api/v2',
    });
    await app.listen(process.env.APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map