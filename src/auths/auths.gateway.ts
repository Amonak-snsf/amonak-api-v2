import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { one, put } from 'src/utils/query';

@WebSocketGateway({ cors: true, path: '/amonak-api', namespace: 'api/auth'})
export class AuthsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server: Server;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  afterInit() {
    console.log("server socket.io server init")
  }

  handleConnection(client: Socket, ...args: any[]) {

    client.on('client', (data)=> {
      console.log(data, ' client id: ' + client.id)
      this.disconnected(client, true);
      client.emit('server', 'server socket is started')
    })
  }

  handleDisconnect(client: Socket) {
    
    this.disconnected(client, false);
    console.log(`socket.io disconnected ${client.handshake.headers.authorization}`, client.handshake.headers.userid)
  }

  @SubscribeMessage('loginRequest')
  create(@MessageBody() createAuthDto: CreateAuthDto, @ConnectedSocket() client: Socket){
    this.server.emit('login', {username: "bestman", password: client.handshake.headers})
  }

  async disconnected(client: Socket, status: Boolean){

    const userId = client.handshake.headers.userid ? client.handshake.headers.userid.toString() : '';
    if(userId){
      await put(this.userModel, {isLog: status}, {_id: userId});
      return true;
    }
    
    return false;
  }

}
