import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartItem, CartItemSchema } from './entities/cart-item.entity';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CartItem.name, schema: CartItemSchema }]),
    CartsModule
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService]
})
export class CartItemsModule {}
