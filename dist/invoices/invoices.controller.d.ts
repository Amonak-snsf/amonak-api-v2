import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { FilterInvoice } from './dto/filter-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto, res: any): Promise<void>;
    findAll(params: FilterInvoice, res: any): Promise<void>;
    findOne(id: string, res: any): Promise<void>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto, res: any): Promise<void>;
    success(params: any, res: any): Promise<void>;
    remove(id: string, res: any): Promise<void>;
}
