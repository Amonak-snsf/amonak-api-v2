import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@WebSocketGateway()
export class AuthsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authsService: AuthsService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log("socket.io connected")
  }

  afterInit(server: Server) {
    console.log("socket.io server init")
  }

  handleDisconnect(client: Socket) {
    console.log(`socket.io disconnected${client}`)
  }

  @SubscribeMessage('createAuth')
  create(@MessageBody() createAuthDto: CreateAuthDto) {
    return {event: 'createAuth', data: this.authsService.create(createAuthDto)};
  }

  @SubscribeMessage('findAllAuths')
  findAll() {
    return this.authsService.findAll();
  }

  @SubscribeMessage('findOneAuth')
  findOne(@MessageBody() _id: number) {
    return this.authsService.findOne(_id);
  }

  @SubscribeMessage('updateAuth')
  update(@MessageBody() updateAuthDto: UpdateAuthDto) {
    return this.authsService.update(updateAuthDto._id, updateAuthDto);
  }

  @SubscribeMessage('removeAuth')
  remove(@MessageBody() _id: number) {
    return this.authsService.remove(_id);
  }
}
