import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { RoomSessionTransportDirectionCd } from '../../../enums';
import { IsDefined, IsEnum } from 'class-validator';

export class CreateTransportRequestDto {
  @AutoMap()
  @IsEnum(RoomSessionTransportDirectionCd)
  @IsDefined()
  @ApiProperty({
    description: 'Transport direction',
    example: RoomSessionTransportDirectionCd.SEND,
  })
  direction: RoomSessionTransportDirectionCd;
}
