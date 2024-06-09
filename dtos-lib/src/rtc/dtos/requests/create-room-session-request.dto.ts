import { AutoMap } from '@automapper/classes';
import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomSessionRequestDto {
  @AutoMap()
  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'Participant ID', example: '123' })
  participantId: string;
}
