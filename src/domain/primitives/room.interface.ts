import { IModel } from './base-model.interface';
import { IRoomParticipant } from './participant.interface';

export interface IRoom extends IModel {
  name: string;
  participants: IRoomParticipant[];
}
