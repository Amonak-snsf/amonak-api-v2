/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice extends Cart {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
    cart: Cart

    @Prop({ required: false, type: String, default: '' })
    comment: string

    @Prop({ required: false, type: String, default: '' })
    paymentType: string

    @Prop({ required: false, type: String, default: '' })
    paymentMethod: string

    @Prop({ required: false, type: Date, default: '' })
    paymentDate: Date

    @Prop({ required: false, type: String, default: '' })
    paymentReference: string

    @Prop({ required: true, type: String })
    invoiceUrl: string;

    @Prop({ required: false, type: String })
    transactionId: string;
}

export  const InvoiceSchema = SchemaFactory.createForClass(Invoice);