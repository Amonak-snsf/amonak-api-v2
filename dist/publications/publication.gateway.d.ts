import { Socket, Server } from "socket.io";
import { PublicationsService } from './publications.service';
export declare class PublicationGateway {
    private readonly publicationService;
    constructor(publicationService: PublicationsService);
    server: Server;
    newPublication(client: Socket, newPublication: {
        type: string;
        data: any;
    }): Promise<void>;
    softDeletePublicationEvent(client: Socket, softDeletePublication: {
        type: string;
        data: any;
    }): Promise<void>;
    saveFollowPublicationEvent(client: Socket, saveFollowPublication: {
        type: string;
        data: any;
    }): Promise<void>;
    likePublicationEvent(client: Socket, likePublication: {
        type: string;
        data: any;
    }): Promise<void>;
    updatePublicationEvent(client: Socket, updatePublication: any): Promise<void>;
    commentPublication(client: Socket, newPublicationComment: {
        room: string | string[];
        data: any;
    }): Promise<void>;
}
