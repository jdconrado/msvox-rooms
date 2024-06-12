import { AutoMap } from '@automapper/classes';

export class IceParametersDto {
  @AutoMap()
  password: string;

  @AutoMap()
  usernameFragment: string;

  @AutoMap()
  iceLite?: boolean;
}
