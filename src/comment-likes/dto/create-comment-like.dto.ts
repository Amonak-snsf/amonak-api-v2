import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentLikeDto {

    @ApiProperty({ required: true, type: String })
    user: String;

    @ApiProperty({ required: true, type: String })
    comment: String;

    @ApiProperty({ required: false, type: String })
    commentCreator?: String;
}