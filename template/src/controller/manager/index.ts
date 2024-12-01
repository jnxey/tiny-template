import { Get, Json, Summary, Dto, StatusCode } from 'koa-tiny';
import { ExtendableContext, Next } from 'koa';

export class Manager {
  @Get()
  @Json()
  @Summary('This is a summary')
  public async index(ctx: ExtendableContext, next: Next) {
    ctx.body = new Dto({ code: StatusCode.success, result: 'hello word', msg: 'success' });
    return next();
  }
}
