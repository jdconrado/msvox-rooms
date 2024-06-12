import { RoomSessionEventsCd, RoomSessionParticipantEventsCd } from '../../enums';
import { RoomSessionEventParametersDto } from './room-session-event-parameters.dto';
export declare class RoomSessionEventDto<T = any> {
    params: RoomSessionEventParametersDto;
    type: RoomSessionEventsCd | RoomSessionParticipantEventsCd;
    timestamp: number;
    body?: T;
}
