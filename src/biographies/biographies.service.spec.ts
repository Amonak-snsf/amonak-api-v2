import { Test, TestingModule } from '@nestjs/testing';
import { BiographiesService } from './biographies.service';

describe('BiographiesService', () => {
  let service: BiographiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiographiesService],
    }).compile();

    service = module.get<BiographiesService>(BiographiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
