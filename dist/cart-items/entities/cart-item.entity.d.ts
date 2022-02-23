import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
export declare type CartItemDocument = CartItem & Document;
export declare class CartItem {
    cart_id: Cart;
    product_id: Product;
    quantity: Number;
    price: Number;
    percentage: Number;
    tax: Number;
    shipping: Number;
    created_at: Date;
    updated_at: Date;
}
export declare const CartItemSchema: mongoose.Schema<mongoose.Document<CartItem, any, any>, mongoose.Model<mongoose.Document<CartItem, any, any>, any, any, any>, any, any>;
