import { AutoMap } from '@automapper/classes';
import { RoomSessionEventsCd } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';
import { RoomSessionEventParametersDto } from './room-session-event-parameters.dto';

export class RoomSessionEventDto<T> {
  @AutoMap(() => RoomSessionEventParametersDto)
  @ApiProperty({
    description: 'Event Parameters',
    type: RoomSessionEventParametersDto,
  })
  params: RoomSessionEventParametersDto;

  @AutoMap()
  @ApiProperty({
    description: 'Event Type',
    enum: RoomSessionEventsCd,
  })
  type: RoomSessionEventsCd;

  @AutoMap()
  @ApiProperty({ description: 'Event Timestamp' })
  timestamp: number;

  @AutoMap()
  @ApiProperty({ description: 'Event Body' })
  body?: T;
}
