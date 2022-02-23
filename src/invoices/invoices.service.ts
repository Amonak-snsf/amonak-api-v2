import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, createIfne, destroy, one, put } from 'src/utils/query';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice, InvoiceDocument } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  private data; 

  constructor(@InjectModel(Invoice.name) private readonly invoiceModel: Model<InvoiceDocument>,
  private configServe: ConfigService
  ){}

  async create(createInvoiceDto: CreateInvoiceDto, res) {
    this.data = createInvoiceDto;

    this.data.invoice_url = `${this.configServe.get('front_url')}/invoice/${createInvoiceDto.payment_reference}`;
    const data = await createIfne(this.invoiceModel, this.data, { cart_id: createInvoiceDto.cart_id, user_id: createInvoiceDto.user_id, amount: createInvoiceDto.amount, status: createInvoiceDto.status })

    res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.invoiceModel, params, null, { created_at: -1 }, params.limit, 'user_id', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async findOne(id: string, res) {

    const data = await one(this.invoiceModel, { _id: id }, null, 'user_id', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto, res) {

    const data = await put(this.invoiceModel, updateInvoiceDto, { _id: id }, 'user_id', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async remove(id: string, res) {
    
    const data = await destroy(this.invoiceModel, { _id: id });

    res.status(HttpStatus.OK).json(data);
  }

  async success(params, res){

    let is_completed = false;
    let is_waiting = true ;

    if(params.status == 'success'){
      is_completed = true;
      is_waiting = false;
    }

    const data = await put(this.invoiceModel, { status: this.data.status, is_waiting: is_waiting, is_completed: is_completed }, { payment_reference: params.transaction }, 'user_id', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

}
