import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoomSessionEventParametersDto {
  @AutoMap()
  @ApiProperty({ description: 'Room Id', example: 'room-id' })
  roomId: string;

  @AutoMap()
  @ApiPropertyOptional({
    description: 'Participant Id',
    example: 'participant-id',
  })
  participantId?: string;

  @AutoMap()
  @ApiPropertyOptional({
    description: 'Producer Id',
    example: 'producer-id',
  })
  producerId?: string;

  @AutoMap()
  @ApiPropertyOptional({
    description: 'Producer Id',
    example: 'consumer-id',
  })
  consumerId?: string;
}
