import { Injectable } from '@nestjs/common';
// import * as svgCaptcha from 'svg-captcha';

interface ITestCode {
  userName: string;
  psd: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }

  createCode(): ITestCode {
    const testCode = {
      userName: 'zhs',
      psd: '123',
    };
    return testCode;
  }
}
