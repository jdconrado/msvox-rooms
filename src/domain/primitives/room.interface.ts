import { IModel } from './base-model.interface';
import { IRoomParticipant } from './participant.interface';
import { RoomStatusCd } from '../enums';

export interface IRoom extends IModel {
  name: string;
  status: RoomStatusCd;
  routerId?: string;
  participants: IRoomParticipant[];
}
