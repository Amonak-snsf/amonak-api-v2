import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { DefaultModel } from 'src/utils/default-model';
export declare type CartItemDocument = CartItem & Document;
export declare class CartItem extends DefaultModel {
    cart: Cart;
    product: Product;
    quantity: Number;
    price: Number;
    percentage: Number;
    tax: Number;
    shipping: Number;
}
export declare const CartItemSchema: mongoose.Schema<mongoose.Document<CartItem, any, any>, mongoose.Model<mongoose.Document<CartItem, any, any>, any, any, any>, {}, {}>;
