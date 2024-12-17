import Tiny from 'node-tiny';
const { Model, Declare, Required, TypeCheck, ParamsType } = Tiny;

export class HomeIndexInput extends Model {
  @Declare()
  @Required('Name is not can be empty')
  @TypeCheck(ParamsType.string, 'Name must be a string')
  name!: string;
}

export class HomeSaveInput extends Model {
  @Declare()
  @Required('Name is not can be empty')
  @TypeCheck(ParamsType.string, 'Name must be a string')
  name!: string;

  @Declare()
  @Required('Password is not can be empty')
  @TypeCheck(ParamsType.string, 'Password must be a string')
  password!: string;
}
