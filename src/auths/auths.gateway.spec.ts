import { Test, TestingModule } from '@nestjs/testing';
import { AuthsGateway } from './auths.gateway';
import { AuthsService } from './auths.service';

describe('AuthsGateway', () => {
  let gateway: AuthsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthsGateway, AuthsService],
    }).compile();

    gateway = module.get<AuthsGateway>(AuthsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
