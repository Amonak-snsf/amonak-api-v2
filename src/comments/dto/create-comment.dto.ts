import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {

    @ApiProperty({ required: true, type: String })
    content: String;

    @ApiProperty({ type: [String], required: false})
    files: File[];

    @ApiProperty({ required: true, type: String })
    user_id: String;

    @ApiProperty({ required: true, type: String })
    publication_id: String;

    @ApiProperty({ required: false, type: Boolean, default: true })
    status: Boolean;
}
