import { AutoMap } from '@automapper/classes';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRoomParticipantDto } from './create-room-participant.dto';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap(() => [CreateRoomParticipantDto])
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateRoomParticipantDto)
  participants?: CreateRoomParticipantDto[];
}
