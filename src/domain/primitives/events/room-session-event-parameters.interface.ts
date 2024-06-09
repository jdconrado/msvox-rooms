export interface IRoomSessionEventParameters {
  roomId: string;
  sessionId: string;
  fromConnectionId?: string;
  toConnectionId?: string;
  participantId?: string;
  producerId?: string;
  consumerId?: string;
}
