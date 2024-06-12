export class LeaveRoomSessionCommand {
  constructor(
    public readonly userId: string,
    public readonly sessionId?: string,
  ) {}
}
