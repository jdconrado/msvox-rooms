import { AutoMap } from '@automapper/classes';
import { IsDefined, IsString } from 'class-validator';

export class CreateRoomSessionRequestDto {
  @AutoMap()
  @IsString()
  @IsDefined()
  participantId: string;
}
