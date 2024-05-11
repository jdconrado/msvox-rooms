export interface IRoomParticipant {
  id: string;
  userId: string;
  sendTransportId?: string;
  recvTransportId?: string;
  createdAt: Date;
}
