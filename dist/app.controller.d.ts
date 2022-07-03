import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private readonly appService;
    private config;
    constructor(appService: AppService, config: ConfigService);
    upload(files: any, res: any, req: any): any;
    remove(path: string, res: any): any;
}
