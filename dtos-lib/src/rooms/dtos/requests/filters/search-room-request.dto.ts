import { AutoMap } from '@automapper/classes';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoomStatusCd } from '../../../../enums';
import { OffsetPaginationDto } from '../../../../commons/dtos';

export class SearchRoomRequestDto extends OffsetPaginationDto {
  @AutoMap()
  @IsOptional()
  @IsString()
  name?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  userId?: string;

  @AutoMap()
  @IsOptional()
  @IsArray()
  @IsEnum(RoomStatusCd, { each: true })
  status?: RoomStatusCd[];
}
