import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsGateway } from './auths.gateway';

@Module({
  providers: [AuthsGateway, AuthsService]
})
export class AuthsModule {}
