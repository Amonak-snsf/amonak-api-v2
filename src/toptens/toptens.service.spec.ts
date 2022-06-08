/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ToptensService } from './toptens.service';

describe('ToptensService', () => {
  let service: ToptensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToptensService],
    }).compile();

    service = module.get<ToptensService>(ToptensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
