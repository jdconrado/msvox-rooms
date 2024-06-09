import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  RoomSessionTransportActionsCd,
  RoomSessionTransportDirectionCd,
} from '../../../enums';

export class ExecuteSessionTransportActionRequestDto {
  @AutoMap()
  @IsDefined()
  @IsEnum(RoomSessionTransportDirectionCd)
  @ApiProperty({
    description: 'Transport direction',
    enum: RoomSessionTransportDirectionCd,
  })
  direction: RoomSessionTransportDirectionCd;

  @AutoMap()
  @IsDefined()
  @IsEnum(RoomSessionTransportActionsCd)
  @ApiProperty({
    description: 'Transport action',
    enum: RoomSessionTransportActionsCd,
  })
  action: RoomSessionTransportActionsCd;
}
