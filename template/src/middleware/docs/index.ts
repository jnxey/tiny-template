import { ExtendableContext, Next } from 'koa';
import fs from 'fs';
import { getStoragePath } from '@/tools';

async function _readSwaggerTemplate() {
  return new Promise((resolve, reject) => {
    const swaggerTemplate = 'template.html';
    fs.readFile(getStoragePath(swaggerTemplate), 'utf8', (err, data) => {
      if (err) reject(null);
      else resolve(data);
    });
  });
}

/*
 * 设置允许的origin
 */
export function setDocs(json: object[]) {
  return async function (ctx: ExtendableContext, next: Next) {
    if (ctx.url === '/docs.html') {
      const template = await _readSwaggerTemplate();
      if (typeof template === 'string') {
        ctx.set('Content-Type', 'text/html');
        ctx.body = template.replace('{JSON}', JSON.stringify(json));
      }
    }
    return next();
  };
}
