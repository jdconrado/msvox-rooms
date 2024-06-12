import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IceServerDto {
  @AutoMap()
  @ApiPropertyOptional({ description: 'Credential' })
  credential?: string;

  @AutoMap()
  @ApiPropertyOptional({ description: 'Server URl' })
  urls: string | string[];

  @AutoMap()
  @ApiPropertyOptional({ description: 'Username' })
  username?: string;
}
