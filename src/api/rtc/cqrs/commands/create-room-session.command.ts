export class CreateRoomSessionCommand {
  constructor(
    public readonly roomId: string,
    public readonly participantId: string,
    public readonly allowRouterCreation: boolean = true,
  ) {}
}
