import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";

export class FilterComment extends PartialType(OmitType(CreateCommentDto, ['files'] as const)){
    
    @ApiProperty({ required: false, type: Number })
    limit: Number;

    @ApiProperty({ required: false, type: String })
    search: String;
}