"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("@nestjs/common");
const core = require("@nestjs/core");
const swagger = require("@nestjs/swagger");
const app_module = require("./app.module");
const path = require("path");
async function bootstrap() {
    const app = await core.NestFactory.create(app_module.AppModule);
    app.enableCors();
    const config = new swagger.DocumentBuilder()
        .setTitle('Amonak API')
        .setDescription('API for amonak project')
        .setVersion('1.0')
        .addTag('amonak-home')
        .build();
    const document = swagger.SwaggerModule.createDocument(app, config);
    const customOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'Amonak APIs REST',
    };
    swagger.SwaggerModule.setup('api', app, document, customOptions);
    app.useStaticAssets((0, path.join)(__dirname, '..', 'static'));
    app.setBaseViewsDir((0, path.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.enableVersioning({
        type: common.VersioningType.URI,
        prefix: 'api/v2',
    });
    await app.listen(process.env.APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map