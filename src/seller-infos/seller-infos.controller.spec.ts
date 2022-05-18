/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SellerInfosController } from './seller-infos.controller';
import { SellerInfosService } from './seller-infos.service';

describe('SellerInfosController', () => {
  let controller: SellerInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerInfosController],
      providers: [SellerInfosService],
    }).compile();

    controller = module.get<SellerInfosController>(SellerInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
