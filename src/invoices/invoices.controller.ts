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

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.invoicesService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto, @Res() res) {
    return this.invoicesService.update(id, updateInvoiceDto, res);
  }

  @Patch('payment/success')
  success(@Query() params, @Res() res) {
    return this.invoicesService.success(params, res);
  }


  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.invoicesService.remove(id, res);
  }
}
