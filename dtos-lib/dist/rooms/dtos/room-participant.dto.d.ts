import { RoomParticipantStatusCd } from '../../enums';
export declare class RoomParticipantDto {
    id: string;
    userId: string;
    displayName?: string;
    status: RoomParticipantStatusCd;
    createdAt: string;
}
