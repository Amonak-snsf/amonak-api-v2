import { PickType } from "@nestjs/swagger";
import { CreateAuthDto } from "./create-auth.dto";

export class EmailAuthDto extends PickType(CreateAuthDto, ["email"] as const) {}
