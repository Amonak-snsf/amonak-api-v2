import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceDocument } from './entities/invoice.entity';
export declare class InvoicesService {
    private readonly invoiceModel;
    private configServe;
    private data;
    constructor(invoiceModel: Model<InvoiceDocument>, configServe: ConfigService);
    create(createInvoiceDto: CreateInvoiceDto, res: any): Promise<void>;
    findAll(params: any, res: any): Promise<void>;
    findOne(_id: string, res: any): Promise<void>;
    update(_id: string, updateInvoiceDto: UpdateInvoiceDto, res: any): Promise<void>;
    remove(_id: string, res: any): Promise<void>;
    success(params: any, res: any): Promise<void>;
}
