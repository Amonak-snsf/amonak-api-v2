import { Test, TestingModule } from "@nestjs/testing";
import { BiographiesController } from "./biographies.controller";
import { BiographiesService } from "./biographies.service";

describe("BiographiesController", () => {
  let controller: BiographiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiographiesController],
      providers: [BiographiesService],
    }).compile();

    controller = module.get<BiographiesController>(BiographiesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
