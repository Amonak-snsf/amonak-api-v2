import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { PublicationsService } from './publications.service';
import { Res } from '@nestjs/common';

@WebSocketGateway({ cors: true, path: "/amonak-api", namespace: "api/publication" })
export class PublicationGateway {

	constructor(private readonly publicationsService: PublicationsService) {}
	@WebSocketServer() server: Server;

  @SubscribeMessage("newPublicationEvent")
  async newPublication(@ConnectedSocket() client: Socket, @MessageBody() newPublication: any) {

    client.broadcast.emit("newPublicationListener", newPublication);
    console.log("form client publication after emit data", newPublication._id)
  }
 
} 
