import { CreateCartDto } from "src/carts/dto/create-cart.dto";
declare const CreateInvoiceDto_base: import("@nestjs/common").Type<Partial<CreateCartDto>>;
export declare class CreateInvoiceDto extends CreateInvoiceDto_base {
    cart: String;
    comment: String;
    paymentType: String;
    paymentMethod: String;
    paymentDate: Date;
    paymentReference: String;
}
export {};
