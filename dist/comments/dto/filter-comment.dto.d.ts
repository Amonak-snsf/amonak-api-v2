import { CreateCommentDto } from "./create-comment.dto";
declare const FilterComment_base: import("@nestjs/common").Type<Partial<Omit<CreateCommentDto, "files">>>;
export declare class FilterComment extends FilterComment_base {
    limit: number;
    search: string;
    publication: string;
}
export {};
