/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import app from './config/app';
import db from './config/database';
import mail from './config/mail';
import jwt from './config/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { AuthsModule } from './auths/auths.module';
import { FriendsModule } from './friends/friends.module';
import { ToptensModule } from './toptens/toptens.module';
import { SellerInfosModule } from './seller-infos/seller-infos.module';
import { CategoriesModule } from './categories/categories.module';
import { NewslettersModule } from './newsletters/newsletters.module';
import { BiographiesModule } from './biographies/biographies.module';
import { ProductsModule } from './products/products.module';
import { PublicationsModule } from './publications/publications.module';
import { PublicationManagementsModule } from './publication-managements/publication-managements.module';
import { CommentsModule } from './comments/comments.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    CacheModule.register({ttl: 3600, isGlobal: true}),
    ConfigModule.forRoot({isGlobal: true,load: [app, db, mail, jwt]}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: `${config.get('db.type')}://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    MailModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('fileDirectory'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AuthsModule,
    FriendsModule,
    ToptensModule,
    SellerInfosModule,
    CategoriesModule,
    NewslettersModule,
    BiographiesModule,
    ProductsModule,
    PublicationsModule,
    PublicationManagementsModule,
    CommentsModule,
    CommentLikesModule,
    CartsModule,
    CartItemsModule,
    InvoicesModule,
    MessagesModule,
    NotificationsModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      maxListeners: 1000000,
      ignoreErrors: true,
      newListener: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
