import { Controller, Get, Post, Type, DataType, Params, StatusCode, Dto, ParamsSource, Summary } from 'node-tiny';
import { HomeIndexInput, HomeSaveInput } from '@/model/home/model';

export class Home extends Controller {
  @Get()
  @Type(DataType.json, DataType.text)
  @Params.in(HomeIndexInput, ParamsSource.query)
  @Summary('Home`s index api')
  index(context) {
    context.error('error');
    // context.send(StatusCode.success, new Dto({ code: StatusCode.success, result: 'hello word', msg: 'success' }));
  }

  @Post()
  @Type(DataType.json, DataType.json)
  @Params.in(HomeSaveInput, ParamsSource.body)
  @Params.out(HomeSaveInput)
  @Summary('Home`s save api')
  save(context) {
    context.send(StatusCode.success, new Dto({ code: StatusCode.success, result: context.params, msg: 'success' }));
  }
}
