import { IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateRoomParticipantDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
