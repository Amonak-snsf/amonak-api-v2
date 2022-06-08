import { Test, TestingModule } from '@nestjs/testing';
import { PublicationManagementsController } from './publication-managements.controller';
import { PublicationManagementsService } from './publication-managements.service';

describe('PublicationManagementsController', () => {
  let controller: PublicationManagementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicationManagementsController],
      providers: [PublicationManagementsService],
    }).compile();

    controller = module.get<PublicationManagementsController>(PublicationManagementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
