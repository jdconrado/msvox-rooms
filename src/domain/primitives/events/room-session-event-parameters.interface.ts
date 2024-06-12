export interface IRoomSessionEventParameters {
  roomId: string;
  sessionId: string;
  from?: boolean;
  toSessionId?: string;
  participantId?: string;
  producerId?: string;
  consumerId?: string;
}
