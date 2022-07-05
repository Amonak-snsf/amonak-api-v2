import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { UserDocument } from "src/users/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
export declare class AuthsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private userModel;
    private jwtService;
    private config;
    server: Server;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, config: ConfigService);
    afterInit(): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    disconnected(client: Socket, status: boolean): Promise<boolean>;
    auth(client: Socket): Promise<void>;
    user(client: Socket): Promise<any>;
}
