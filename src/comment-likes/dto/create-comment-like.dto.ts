import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentLikeDto {

    @ApiProperty({ required: true, type: String })
    user_id: String;

    @ApiProperty({ required: true, type: String })
    comment_id: String;
}
