import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString } from 'class-validator';

export class SearchRoomRequestDto {
  @AutoMap()
  @IsOptional()
  @IsString()
  name?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  userId?: string;
}
