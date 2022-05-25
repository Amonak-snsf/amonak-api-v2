import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";

export class FilterComment extends PartialType(OmitType(CreateCommentDto, ['files'] as const)){
    
    @ApiProperty({ required: false, type: Number })
    limit: number;

    @ApiProperty({ required: false, type: String })
    search: string;

    @ApiProperty({ required: false, type: String })
    publication: string;
}