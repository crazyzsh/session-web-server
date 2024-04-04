import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'crazy', //生成服务端session 签名 可以理解为加盐
      name: 'zsh-secret', //生成客户端cookie 的名字 默认 connect.sid
      rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
      cookie: { maxAge: null }, //设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
    }),
  );
  await app.listen(4444);
}
bootstrap();
