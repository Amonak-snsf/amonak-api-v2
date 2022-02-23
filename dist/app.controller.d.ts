import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    staticImagesAvatar(file_name: string, res: any): any;
    staticImagesUploads(file_name: string, res: any): any;
    staticVideosAvatar(file_name: string, res: any): any;
    staticVideossUploads(file_name: string, res: any): any;
}
