import { Socket, Server } from "socket.io";
import { FriendsService } from 'src/friends/friends.service';
export declare class MessageGateway {
    private readonly friendService;
    server: Server;
    constructor(friendService: FriendsService);
    handleMessage(client: any, payload: any): string;
    joinChatRoom(client: Socket, data: {
        from: string;
        to: string;
    }): Promise<void>;
    leaveChatRoom(client: Socket, data: {
        from: string;
        to: string;
    }): Promise<void>;
    sendMessage(client: Socket, data: {
        room: string;
        message: any;
    }): Promise<void>;
    deleteMessage(client: Socket, data: {
        room: string;
    }): Promise<void>;
}
