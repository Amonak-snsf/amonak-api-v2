import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentLikeDto {

    @ApiProperty({ required: true, type: String })
    user: string;

    @ApiProperty({ required: true, type: String })
    comment: string;

    @ApiProperty({ required: false, type: String })
    commentCreator?: string;
}