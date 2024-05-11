import { EntityDto } from './entity.dto';
import { RoomParticipantDto } from './room-participant.dto';
import { RoomStatusCd } from '../../enums';
export declare class RoomDto extends EntityDto {
    name: string;
    routerId?: string;
    status: RoomStatusCd;
    participants: RoomParticipantDto[];
}
