/*
  This file is used to define the RoomSession interface.
  A RoomSession is a session that is created when a participant joins a room.
  It manages the producers and consumers that are created by the participant.
 */
export interface IRoomSession {
  id: string;
  roomId: string;
  participantId: string;
  userId: string;
  producerTransportId: string | null;
  consumerTransportId: string | null;
  producerIds: string[];
  consumerIds: string[];
}
