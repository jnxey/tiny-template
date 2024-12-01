import Tiny, { Controller } from 'koa-tiny';
import Koa from 'koa';
import Router from '@koa/router';

import serve from 'koa-static';
import jsonwebtoken from 'jsonwebtoken';
import { getStoragePath, printError } from '@/tools';
import { setDocs } from '@/middleware/docs';
import { koaBody } from 'koa-body';
import config from '@/config';
import { Manager } from '@/controller/manager';

const app = new Koa();
const router = new Router();

// 解析body内的json以及urlencoded
app.use(koaBody());

// 初始化配置
Tiny.init({
  controller: { prefix: '/api/' },
  jwt: { expiresIn: '4h', jsonwebtoken: jsonwebtoken }
});

// 绑定模块
Controller.connect<Manager>(new Manager(), router);

// 中间件配置
app.use(router.routes());
app.use(router.allowedMethods());
app.use(setDocs(Controller.apiInfoJson));
app.use(serve(getStoragePath()));

// 全局错误处理
app.on('error', (err) => {
  printError(err);
});

app.listen(config.port, () => {
  console.log(`Server is running on:`);
  console.log(`- URL:   http://localhost:${config.port}`);
});
