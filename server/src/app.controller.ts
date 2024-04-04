import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';

import * as svgCaptcha from 'svg-captcha';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('code')
  getCode(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 150, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    // captcha.data是一张svg
    // captcha.text是验证码的内容，存储到session中，供后续验证用
    req.session.verifycode = captcha.text; //存储验证码记录到session
    // 设置返回类型
    res.type('image/svg+xml');
    // 将svg返回给前端
    res.send(captcha.data);
  }

  @Post('login')
  creatCode(@Req() req, @Body() body) {
    const sessionVerifyCode = req.session?.verifycode;
    const bodyVerifyCode = body.verifycode;
    console.log(sessionVerifyCode, bodyVerifyCode);
    if (
      sessionVerifyCode.toLocaleLowerCase() ===
      bodyVerifyCode.toLocaleLowerCase()
    ) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }
  }
}
