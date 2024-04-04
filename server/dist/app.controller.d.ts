import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getCode(req: any, res: any): void;
    creatCode(req: any, body: any): {
        message: string;
    };
}
