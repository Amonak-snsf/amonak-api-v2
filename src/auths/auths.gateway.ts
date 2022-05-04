import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'
import { CreateAuthDto } from './dto/create-auth.dto';

@WebSocketGateway({ cors: true, path: '/amonak-api', namespace: 'api/auth'})
export class AuthsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server: Server;

  constructor() {}
  // pour recuperer l'entête avec les header du socket: client.handshake
  afterInit() {
    console.log("server socket.io server init")
  }

  handleConnection(client: Socket, ...args: any[]) {

    client.on('client', (data)=> {
      console.log(data, ' client id: ' + client.id)
      client.emit('server', 'server socket is started')
    })
  }

  handleDisconnect(client: Socket) {
    console.log(`socket.io disconnected ${client.id}`)
  }

  @SubscribeMessage('loginRequest')
  create(@MessageBody() createAuthDto: CreateAuthDto, @ConnectedSocket() client: Socket){
    this.server.emit('login', {username: "bestman", password: client.handshake.headers.authorization})
  }

}
