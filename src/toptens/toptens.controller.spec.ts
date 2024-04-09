/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ToptensController } from './toptens.controller';
import { ToptensService } from './toptens.service';

describe('ToptensController', () => {
  let controller: ToptensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToptensController],
      providers: [ToptensService],
    }).compile();

    controller = module.get<ToptensController>(ToptensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
