import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

export type CartItemDocument = CartItem & Document;

@Schema()
export class CartItem {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
    cart_id: Cart

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product_id: Product

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

    @Prop({ required: true, type: Date, default: Date.now })
    created_at: Date

    @Prop({ required: true, type: Date, default: Date.now })
    updated_at: Date
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);