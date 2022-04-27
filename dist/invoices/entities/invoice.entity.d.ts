import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';
export declare type InvoiceDocument = Invoice & Document;
export declare class Invoice extends Cart {
    cart_id: Cart;
    comment: String;
    payment_type: String;
    payment_method: String;
    payment_date: Date;
    payment_reference: String;
    invoice_url: String;
    created_at: Date;
    updated_at: Date;
}
export declare const InvoiceSchema: mongoose.Schema<mongoose.Document<Invoice, any, any>, mongoose.Model<mongoose.Document<Invoice, any, any>, any, any, any>, any, any>;
