"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const app_1 = require("./config/app");
const database_1 = require("./config/database");
const mail_1 = require("./config/mail");
const jwt_1 = require("./config/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const mail_module_1 = require("./mail/mail.module");
const platform_express_1 = require("@nestjs/platform-express");
const auth_module_1 = require("./auth/auth.module");
const auths_module_1 = require("./auths/auths.module");
const friends_module_1 = require("./friends/friends.module");
const toptens_module_1 = require("./toptens/toptens.module");
const seller_infos_module_1 = require("./seller-infos/seller-infos.module");
const categories_module_1 = require("./categories/categories.module");
const newsletters_module_1 = require("./newsletters/newsletters.module");
const biographies_module_1 = require("./biographies/biographies.module");
const products_module_1 = require("./products/products.module");
const publications_module_1 = require("./publications/publications.module");
const publication_managements_module_1 = require("./publication-managements/publication-managements.module");
const comments_module_1 = require("./comments/comments.module");
const comment_likes_module_1 = require("./comment-likes/comment-likes.module");
const invoices_module_1 = require("./invoices/invoices.module");
const carts_module_1 = require("./carts/carts.module");
const cart_items_module_1 = require("./cart-items/cart-items.module");
const notifications_module_1 = require("./notifications/notifications.module");
const messages_module_1 = require("./messages/messages.module");
const event_emitter_1 = require("@nestjs/event-emitter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({ ttl: 3600, isGlobal: true }),
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [app_1.default, database_1.default, mail_1.default, jwt_1.default] }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    uri: `${config.get('db.type')}://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            mail_module_1.MailModule,
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    dest: configService.get('fileDirectory'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            auths_module_1.AuthsModule,
            friends_module_1.FriendsModule,
            toptens_module_1.ToptensModule,
            seller_infos_module_1.SellerInfosModule,
            categories_module_1.CategoriesModule,
            newsletters_module_1.NewslettersModule,
            biographies_module_1.BiographiesModule,
            products_module_1.ProductsModule,
            publications_module_1.PublicationsModule,
            publication_managements_module_1.PublicationManagementsModule,
            comments_module_1.CommentsModule,
            comment_likes_module_1.CommentLikesModule,
            carts_module_1.CartsModule,
            cart_items_module_1.CartItemsModule,
            invoices_module_1.InvoicesModule,
            messages_module_1.MessagesModule,
            notifications_module_1.NotificationsModule,
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                maxListeners: 1000000,
                ignoreErrors: true,
                newListener: true
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map