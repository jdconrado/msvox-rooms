import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddRoomParticipantCommand } from '@api/rooms/cqrs/commands';
import { RoomParticipant } from '@domain/models';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { RoomService } from '@services/room.service';

@CommandHandler(AddRoomParticipantCommand)
export class AddParticipantCommandHandler
  implements ICommandHandler<AddRoomParticipantCommand>
{
  private readonly logger = new Logger(AddParticipantCommandHandler.name);
  constructor(private readonly roomService: RoomService) {}

  async execute(command: AddRoomParticipantCommand): Promise<RoomParticipant> {
    this.logger.debug('execute command: {command}', { command });
    const room = await this.roomService.getById(command.roomId);
    if (!room) {
      throw new NotFoundException(`room ${command.roomId} not found`);
    }

    let participant = room.participants.find(
      (p) => p.userId === command.participant.userId,
    );
    if (participant) {
      throw new BadRequestException(
        `participant belonging to user ${command.participant.userId} already exists in room ${command.roomId}`,
      );
    }
    participant = command.participant;

    room.participants.push(participant);
    await this.roomService.replace(room.id, room);

    this.logger.debug('participant added to room: {participant}', {
      participant: command.participant,
    });

    return command.participant;
  }
}
