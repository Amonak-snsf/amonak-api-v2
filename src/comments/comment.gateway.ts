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
  async newCommentEvent(@ConnectedSocket() client: Socket, @MessageBody() newComment: {publicationId: string, comment: any}) {
  	console.log("new comment", newComment.publicationId)
  	client.broadcast.emit("newCommentEventListener", newComment);
  }

  @SubscribeMessage('likeCommentEvent')
  async likeCommentEvent(@ConnectedSocket() client: Socket, @MessageBody() commentId: {commentId: string}) {
  	console.log("like comment", commentId.commentId)
  	client.broadcast.emit("likeCommentListener", commentId);
  }
}
