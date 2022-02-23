import { CreateCartDto } from "src/carts/dto/create-cart.dto";
declare const CreateInvoiceDto_base: import("@nestjs/common").Type<Partial<CreateCartDto>>;
export declare class CreateInvoiceDto extends CreateInvoiceDto_base {
    cart_id: String;
    comment: String;
    payment_type: String;
    payment_method: String;
    payment_date: Date;
    payment_reference: String;
}
export {};
