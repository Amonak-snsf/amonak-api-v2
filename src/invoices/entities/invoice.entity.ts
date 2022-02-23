import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Cart } from 'src/carts/entities/cart.entity';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice extends Cart {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
    cart_id: Cart

    @Prop({ required: false, type: String, default: '' })
    comment: String

    @Prop({ required: false, type: String, default: '' })
    payment_type: String

    @Prop({ required: false, type: String, default: '' })
    payment_method: String

    @Prop({ required: false, type: Date, default: '' })
    payment_date: Date

    @Prop({ required: false, type: String, default: '' })
    payment_reference: String

    @Prop({ required: true, type: String })
    invoice_url: String;
}

export  const InvoiceSchema = SchemaFactory.createForClass(Invoice);