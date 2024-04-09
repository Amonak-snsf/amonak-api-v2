import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { DefaultModel } from 'src/utils/default-model';

export type FirstDisplayDocument = FirstDisplay & Document;

@Schema()
export class FirstDisplay extends DefaultModel {

@Prop({ required: true })
title: string;

@Prop({ required: true })
subtitle: string;

@Prop({ required: true })
displayNumber: string;

@Prop({ required: true })
logo: string;

@Prop({ required: true })
image: string;

@Prop({ required: true, default: "FERMER"})
buttonTitle: string;

}

export const FirstDisplaySchema = SchemaFactory.createForClass(FirstDisplay);
