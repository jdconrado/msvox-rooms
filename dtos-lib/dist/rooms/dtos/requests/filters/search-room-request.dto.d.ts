import { RoomStatusCd } from '../../../../enums';
import { OffsetPaginationDto } from '../../../../commons/dtos';
export declare class SearchRoomRequestDto extends OffsetPaginationDto {
    name?: string;
    userId?: string;
    status?: RoomStatusCd[];
}
