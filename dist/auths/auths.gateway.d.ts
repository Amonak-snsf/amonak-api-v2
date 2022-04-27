/// <reference types="node" />
import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly authsService;
    constructor(authsService: AuthsService);
    handleConnection(client: Socket, ...args: any[]): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    create(createAuthDto: CreateAuthDto): {
        event: string;
        data: string;
    };
    findAll(): string;
    findOne(id: number): string;
    update(updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
