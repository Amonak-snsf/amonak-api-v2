import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { Res } from '@nestjs/common';
import { PubManagementType } from 'src/publication-managements/dto/publication-managements-type.dto'

@WebSocketGateway({ cors: true, path: "/amonak-api", namespace: "api/publication" })
export class PublicationGateway {

	constructor() {}
	@WebSocketServer() server: Server;

  @SubscribeMessage("newPublicationEvent")
  async newPublication(@ConnectedSocket() client: Socket, @MessageBody() newPublication: {type: string, data: any}) {

  	if(newPublication.type === 'desktop'){
  		this.server.emit("newPublicationListener", newPublication.data);
  	}
  	if(newPublication.type === 'mobile'){
  		client.broadcast.emit("newPublicationListener", newPublication.data);
  	}
    
    console.log("form client publication id after create it", newPublication.data._id, newPublication.type)
  }

  @SubscribeMessage("softDeletePublicationEvent")
  async softDeletePublicationEvent(@ConnectedSocket() client: Socket, @MessageBody() softDeletePublication: {type: string, data: any}) {

  	if(softDeletePublication.type === PubManagementType.softDeleteAll){
  		this.server.emit("softDeletePublicationListener", softDeletePublication.data);
  		console.log(softDeletePublication.type)
  	}
  	if(softDeletePublication.type === PubManagementType.softDelete){
  		console.log(softDeletePublication.type)
  		client.emit("softDeletePublicationListener", softDeletePublication.data);
  	}

    console.log("form client publication list after delete one of the list")
  }

  @SubscribeMessage("saveFollowPublicationEvent")
  async saveFollowPublicationEvent(@ConnectedSocket() client: Socket, @MessageBody() saveFollowPublication: {type: string, data: any}) {

  	if(saveFollowPublication.type === PubManagementType.save){
  		client.emit("saveFollowPublicationListener", saveFollowPublication.data);
  		console.log(saveFollowPublication.type)
  	}
  	if(saveFollowPublication.type === PubManagementType.follow){
  		console.log(saveFollowPublication.type)
  		this.server.emit("saveFollowPublicationListener", saveFollowPublication.data);
  	}

    console.log("form client publication list after delete one of the list")
  }

  @SubscribeMessage("likePublicationEvent")
  async likePublicationEvent(@ConnectedSocket() client: Socket, @MessageBody() likePublication: {type: string, data: any}) {

    this.server.emit("likePublicationListener", likePublication.data);
    console.log("like publication")
  }

  @SubscribeMessage("updatePublicationEvent")
  async updatePublicationEvent(@ConnectedSocket() client: Socket, @MessageBody() updatePublication: any) {

  	this.server.emit("updatePublicationListener", updatePublication);
    console.log("form client publication list after update the list")
  }
 
 	@SubscribeMessage("joinPublicationRoom")
 	async joinPublicationRoom(@ConnectedSocket() client: Socket, room: string){
 		client.join(room);
 		client.emit("joinedPublicationRoom", room);
 	}

 	@SubscribeMessage("leavePublicationRoom")
 	async leavePublicationRoom(@ConnectedSocket() client: Socket, room: string){
 		client.leave(room);
 		client.emit("leftPublicationRoom", room);
 	}

 	@SubscribeMessage("commentPublication")
 	async commentPublication(@ConnectedSocket() client: Socket, @MessageBody() newPublicationComment: {room: string|string[], data: any}){

 		let room: string|string[] = newPublicationComment.room;
 		if(!Array.isArray(room)) room = [room];
 		this.server.to(room).emit('newPublicationComment', newPublicationComment.data)
 	}
} 

