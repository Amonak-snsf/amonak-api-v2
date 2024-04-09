import { Controller, Get, Body, Patch, Param, Res } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { userInfo } from "os";
import { BiographiesService } from "./biographies.service";
import { UpdateBiographyDto } from "./dto/update-biography.dto";

@ApiTags("biography")
@ApiHeader({
  name: "lang",
  description: "language",
})
@Controller("api/biographies")
export class BiographiesController {
  constructor(private readonly biographiesService: BiographiesService) {}

  @Get(":user")
  findOne(@Param("user") user: string, @Res() res) {
    return this.biographiesService.findOne(user, res);
  }

  @Patch(":user")
  update(
    @Param("user") user: string,
    @Body() updateBiographyDto: UpdateBiographyDto,
    @Res() res
  ) {
    return this.biographiesService.update(user, updateBiographyDto, res);
  }
}
