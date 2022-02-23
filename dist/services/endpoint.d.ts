import { ConfigService } from "@nestjs/config";
export declare class Endpoint {
    private configService?;
    constructor(configService?: ConfigService);
    readonly static_url: string;
}
