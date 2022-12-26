/* eslint-disable prettier/prettier */
import { Prop } from '@nestjs/mongoose';

export class DefaultModel {

    @Prop({ required: false, default: Date.now, type: Date })
    createdAt: Date;

    @Prop({ required: false, default: Date.now, type: Date })
    updatedAt: Date;
}
