import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomSessionConsumerProducerActionsCd } from '@domain/enums';

export class ExecuteSessionConsumerProducerActionRequestDto {
  @AutoMap()
  @IsDefined()
  @IsEnum(RoomSessionConsumerProducerActionsCd)
  @ApiProperty({
    description: 'Action',
    enum: RoomSessionConsumerProducerActionsCd,
  })
  action: RoomSessionConsumerProducerActionsCd;
}
