import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SctpParametersDto {
  @AutoMap()
  @ApiProperty({ example: 65535 })
  MIS: number;

  @AutoMap()
  @ApiProperty({ example: 65535 })
  OS: number;

  @AutoMap()
  @ApiProperty({ example: 65535 })
  maxMessageSize: number;

  @AutoMap()
  @ApiProperty({ example: 65535 })
  port: number;
}
