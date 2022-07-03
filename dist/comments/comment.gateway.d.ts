import { Socket, Server } from "socket.io";
export declare class CommentGateway {
    server: Server;
    handleMessage(client: any, payload: any): string;
    newCommentEvent(client: Socket, newComment: {
        comment: any;
    }): Promise<void>;
    likeCommentEvent(client: Socket, newLike: {
        comment: string;
        publication: string;
    }): Promise<void>;
}
