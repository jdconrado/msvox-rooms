import { AutoMap } from '@automapper/classes';

export class IceServerDto {
  @AutoMap()
  credential?: string;

  @AutoMap()
  urls: string | string[];

  @AutoMap()
  username?: string;
}
