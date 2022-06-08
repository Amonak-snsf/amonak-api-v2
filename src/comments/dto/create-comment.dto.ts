import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {

    @ApiProperty({ required: true, type: String })
    content: string;

    @ApiProperty({ type: [String], required: false})
    files: File[];

    @ApiProperty({ required: true, type: String })
    user: string;

    @ApiProperty({ required: true, type: String })
    publication: string;

    @ApiProperty({ required: false, type: String })
    publicationCreator?: string;

    @ApiProperty({ required: false, type: Boolean, default: true })
    status: Boolean;
}
