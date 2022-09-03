import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { FriendsService } from 'src/friends/friends.service';

@WebSocketGateway({ cors: true, path: "/amonak-api", namespace: "api/chat" })
export class MessageGateway {
  @WebSocketServer() server: Server;
  
  constructor(private readonly friendService: FriendsService){}
 	
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage("joinChatRoom")
 	async joinChatRoom(@ConnectedSocket() client: Socket, @MessageBody() data: {from: string, to: string}){
 		
		const friend = await this.friendService.one(data);
		if(friend){
		client.join(`${friend._id}`);
		client.emit("joinedChatRoom", `${friend._id}`);
		console.log("join room", `${friend._id}`)
		}
 	}

 	@SubscribeMessage("leaveChatRoom")
 	async leaveChatRoom(@ConnectedSocket() client: Socket, @MessageBody() data: {from: string, to: string}){
		
		const friend = await this.friendService.one(data);
		if(friend){
		client.leave(`${friend._id}`);
 		client.emit("leftChatRoom", `${friend._id}`);
		}
 	}

	 @SubscribeMessage("sendMessage")
	 async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: {room: string, message: any}){
		//this.server.to(data.room).emit('getMessage', data);
		//client.broadcast.to(data.room).emit('getMessage', data);
		client.to(data.room).emit('getMessage', data);
	 }

	 @SubscribeMessage("deleteMessage")
	 async deleteMessage(@ConnectedSocket() client: Socket, @MessageBody() data: {room: string}){
		this.server.to(data.room).emit('deleteMessageListener', data);
	 }
}