export class ConnectRoomSessionCommand {
  constructor(
    public readonly sessionId: string,
    public readonly userId: string,
    public readonly connectionId: string,
  ) {}
}
