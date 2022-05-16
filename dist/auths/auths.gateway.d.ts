import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
export declare class AuthsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private userModel;
    server: Server;
    constructor(userModel: Model<UserDocument>);
    afterInit(): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): void;
    disconnected(client: Socket, status: Boolean): Promise<boolean>;
    auth(client: Socket): Promise<void>;
    user(client: Socket): Promise<{}>;
}
