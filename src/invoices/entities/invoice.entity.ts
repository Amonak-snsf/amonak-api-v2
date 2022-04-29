import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice extends Cart {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
    cart: Cart

    @Prop({ required: false, type: String, default: '' })
    comment: String

    @Prop({ required: false, type: String, default: '' })
    paymentType: String

    @Prop({ required: false, type: String, default: '' })
    paymentMethod: String

    @Prop({ required: false, type: Date, default: '' })
    paymentDate: Date

    @Prop({ required: false, type: String, default: '' })
    paymentReference: String

    @Prop({ required: true, type: String })
    invoiceUrl: String;

    @Prop({ required: false, type: String })
    transactionId: String;
}

export  const InvoiceSchema = SchemaFactory.createForClass(Invoice);