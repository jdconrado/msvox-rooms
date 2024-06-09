import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class IceParametersDto {
  @AutoMap()
  @ApiProperty({ example: 'password' })
  password: string;

  @AutoMap()
  @ApiProperty({ example: 'usernameFragment' })
  usernameFragment: string;

  @AutoMap()
  @ApiProperty({ example: true })
  iceLite?: boolean;
}
