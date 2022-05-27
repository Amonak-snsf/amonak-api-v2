import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { Res } from '@nestjs/common';
import { PubManagementType } from 'src/publication-managements/dto/publication-managements-type.dto'

@WebSocketGateway({ cors: true, path: "/amonak-api", namespace: "api/comment" })
@WebSocketGateway()
export class CommentGateway {
	@WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('newCommentEvent')
  async newCommentEvent(@ConnectedSocket() client: Socket, @MessageBody() newComment: {comment: any}) {
  	console.log("new publication comment", newComment.comment.publication)
  	client.broadcast.emit("newCommentEventListener", newComment.comment);
  	client.emit("newCommentLocalEventListener", newComment.comment);
  }

  @SubscribeMessage('likeCommentEvent')
  async likeCommentEvent(@ConnectedSocket() client: Socket, @MessageBody() newLike: {comment: string, publication: string}) {
  	console.log("new publication like", newLike.comment, newLike.publication)
  	client.broadcast.emit("likeCommentListener", newLike);
  }
}
