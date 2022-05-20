import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateAuthDto } from "./create-auth.dto";

export class TokenPasswordAuthDto extends PickType(CreateAuthDto, [
  "password",
] as const) {
  @ApiProperty()
  token: string;
}
