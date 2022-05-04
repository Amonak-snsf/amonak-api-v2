import { Module } from '@nestjs/common';
import { AuthsGateway } from './auths.gateway';

@Module({
  providers: [AuthsGateway]
})
export class AuthsModule {}
