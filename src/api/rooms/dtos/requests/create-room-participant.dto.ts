import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateRoomParticipantDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  displayName?: string;
}
