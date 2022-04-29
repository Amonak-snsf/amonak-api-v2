import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthsService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(_id: number) {
    return `This action returns a #${_id} auth`;
  }

  update(_id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${_id} auth`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} auth`;
  }
} 
