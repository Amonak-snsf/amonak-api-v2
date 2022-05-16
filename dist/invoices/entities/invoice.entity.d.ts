import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';
export declare type InvoiceDocument = Invoice & Document;
export declare class Invoice extends Cart {
    cart: Cart;
    comment: String;
    paymentType: String;
    paymentMethod: String;
    paymentDate: Date;
    paymentReference: String;
    invoiceUrl: String;
    transactionId: String;
}
export declare const InvoiceSchema: mongoose.Schema<mongoose.Document<Invoice, any, any>, mongoose.Model<mongoose.Document<Invoice, any, any>, any, any, any>, {}, {}>;
