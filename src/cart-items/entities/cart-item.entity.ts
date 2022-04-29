import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { DefaultModel } from 'src/utils/default-model';

export type CartItemDocument = CartItem & Document;

@Schema()
export class CartItem extends DefaultModel{

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
    cart: Cart

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product: Product

    @Prop({ required: true, type: Number, default: 1 })
    quantity: Number

    @Prop({ required: true, type: Number, default: 1 })
    price: Number

    @Prop({ required: false, type: Number, default: 0 })
    percentage: Number

    @Prop({ required: false, type: Number, default: 0 })
    tax: Number

    @Prop({ required: false, type: Number, default: 0 })
    shipping: Number
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);