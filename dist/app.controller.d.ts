import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private readonly appService;
    private config;
    constructor(appService: AppService, config: ConfigService);
    getHello(): string;
    upload(files: any, res: any): any;
    staticVideossUploads(file_name: string, res: any): any;
}
