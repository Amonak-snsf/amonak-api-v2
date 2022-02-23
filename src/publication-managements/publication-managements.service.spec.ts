import { Test, TestingModule } from '@nestjs/testing';
import { PublicationManagementsService } from './publication-managements.service';

describe('PublicationManagementsService', () => {
  let service: PublicationManagementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationManagementsService],
    }).compile();

    service = module.get<PublicationManagementsService>(PublicationManagementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
