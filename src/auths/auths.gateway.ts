import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@WebSocketGateway()
export class AuthsGateway {
  constructor(private readonly authsService: AuthsService) {}

  @SubscribeMessage('createAuth')
  create(@MessageBody() createAuthDto: CreateAuthDto) {
    return this.authsService.create(createAuthDto);
  }

  @SubscribeMessage('findAllAuths')
  findAll() {
    return this.authsService.findAll();
  }

  @SubscribeMessage('findOneAuth')
  findOne(@MessageBody() id: number) {
    return this.authsService.findOne(id);
  }

  @SubscribeMessage('updateAuth')
  update(@MessageBody() updateAuthDto: UpdateAuthDto) {
    return this.authsService.update(updateAuthDto.id, updateAuthDto);
  }

  @SubscribeMessage('removeAuth')
  remove(@MessageBody() id: number) {
    return this.authsService.remove(id);
  }
}
