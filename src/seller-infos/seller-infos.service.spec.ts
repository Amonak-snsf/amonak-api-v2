/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SellerInfosService } from './seller-infos.service';

describe('SellerInfosService', () => {
  let service: SellerInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerInfosService],
    }).compile();

    service = module.get<SellerInfosService>(SellerInfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
