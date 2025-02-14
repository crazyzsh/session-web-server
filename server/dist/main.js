"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: 'crazy',
        name: 'zsh-secret',
        rolling: true,
        cookie: { maxAge: null },
    }));
    await app.listen(4444);
}
bootstrap();
//# sourceMappingURL=main.js.map