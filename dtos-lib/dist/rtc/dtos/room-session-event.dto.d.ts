import { RoomSessionEventsCd } from '../../enums';
import { RoomSessionEventParametersDto } from './room-session-event-parameters.dto';
export declare class RoomSessionEventDto<T> {
    params: RoomSessionEventParametersDto;
    type: RoomSessionEventsCd;
    timestamp: number;
    body?: T;
}
