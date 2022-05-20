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

    this.data.invoice_url = `${this.configServe.get('frontUrl')}/invoice/${createInvoiceDto.paymentReference}`;
    const data = await createIfne(this.invoiceModel, this.data, { cart: createInvoiceDto.cart, user: createInvoiceDto.user, amount: createInvoiceDto.amount, status: createInvoiceDto.status })

    res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.invoiceModel, params, null, { createdAt: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res) {

    const data = await one(this.invoiceModel, { _id: _id }, null, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, updateInvoiceDto: UpdateInvoiceDto, res) {

    const data = await put(this.invoiceModel, updateInvoiceDto, { _id: _id }, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.invoiceModel, { _id: _id });

    res.status(HttpStatus.OK).json(data);
  }

  async success(params, res){

    let isCompleted = false;
    let isWaiting = true ;

    if(params.status == 'success'){
      isCompleted = true;
      isWaiting = false;
    }

    const data = await put(this.invoiceModel, { status: this.data.status, isWaiting: isWaiting, isCompleted: isCompleted }, { paymentReference: params.transaction }, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

}
