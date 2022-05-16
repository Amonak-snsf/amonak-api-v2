/* eslint-disable prettier/prettier */
import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { one, put } from 'src/utils/query';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true, path: '/amonak-api', namespace: 'api/auth'})
export class AuthsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server: Server;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {}

  afterInit() {
    console.log("server socket.io server init")
  }

  async handleConnection(client: Socket, ...args: any[]) {

    const user = await this.user(client);
    client.on('client', (data)=> {
      console.log(data, ' client id: ' + client.id)
      this.disconnected(client, true);
      client.emit('server', {message: 'server socket is started', client: client.handshake.headers, auth: user})
    })
  }

  handleDisconnect(client: Socket) {
    
    this.disconnected(client, false);
    console.log(`socket.io disconnected ${client.handshake.headers.authorization}`, client.handshake.headers.userid)
  }

  async disconnected(client: Socket, status: boolean){

    const userId = client.handshake.headers.userid ? client.handshake.headers.userid.toString() : '';
    if(userId){
      await put(this.userModel, {isLog: status}, {_id: userId});
      return true;
    }
    
    return false;
  }

  @SubscribeMessage('authRequest')
  async auth(client: Socket){

    const user = await this.user(client);
    client.emit('authResponse', user);
  }

  async user(client: Socket){

    let auth = {};
    const userId = client.handshake.headers.userid ? client.handshake.headers.userid.toString() : '';
    let verifyJwt;
    try {
       verifyJwt = this.jwtService.verify(client.handshake.headers.authorization.toString().replace('Bearer ', ''));
    } catch (error) {
      console.log('invalid token')
    }
    if(userId && verifyJwt && verifyJwt.email && verifyJwt.iat){
      auth = await one(this.userModel, {_id: userId});
    }

    return auth;
  }

}
