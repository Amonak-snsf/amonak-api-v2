import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilterInvoice } from './dto/filter-invoice.dto';

@ApiTags('invoices')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})

@Controller('api/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto, @Res() res) {
    return this.invoicesService.create(createInvoiceDto, res);
  }

  @Get()
  findAll(@Query() params: FilterInvoice, @Res() res) {
    return this.invoicesService.findAll(params, res);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string, @Res() res) {
    return this.invoicesService.findOne(_id, res);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateInvoiceDto: UpdateInvoiceDto, @Res() res) {
    return this.invoicesService.update(_id, updateInvoiceDto, res);
  }

  @Patch('payment/success')
  success(@Query() params, @Res() res) {
    return this.invoicesService.success(params, res);
  }


  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.invoicesService.remove(_id, res);
  }
}
