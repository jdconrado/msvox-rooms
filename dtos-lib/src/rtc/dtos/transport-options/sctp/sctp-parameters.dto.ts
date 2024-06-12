import { AutoMap } from '@automapper/classes';

export class SctpParametersDto {
  @AutoMap()
  MIS: number;

  @AutoMap()
  OS: number;

  @AutoMap()
  maxMessageSize: number;

  @AutoMap()
  port: number;
}
