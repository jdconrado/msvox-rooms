import { IRoomService } from '@services/primitives';
import { Injectable, Logger } from '@nestjs/common';
import {
  IRoom,
  IRoomFilter,
  IRoomParticipant,
  ISearchMetadata,
} from '@domain/primitives';
import { RoomRepository } from '@infra/orm/repositories';

@Injectable()
export class RoomService implements IRoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(private readonly repository: RoomRepository) {}

  async create(input: IRoom): Promise<IRoom> {
    this.logger.debug('create({input})', { input });
    const result = await this.repository.create(input);
    this.logger.debug('create: {result}', { result });

    return result;
  }

  delete(id: string): Promise<IRoom | null> {
    this.logger.debug('delete({id})', { id });
    return this.repository.delete(id);
  }

  getById(id: string): Promise<IRoom | null> {
    this.logger.debug('getById({id})', { id });
    return this.repository.getById(id);
  }

  async search(
    filter: IRoomFilter,
    options?: ISearchMetadata,
  ): Promise<[IRoom[], ISearchMetadata]> {
    this.logger.debug('search({filter, pagination, sorting})', {
      filter,
      pagination: options?.pagination,
      sorting: options?.sorting,
    });
    const result = await this.repository.search(filter, options);
    this.logger.debug('search: {count}', { count: result[1].pagination.count });

    return result;
  }

  async replace(id: string, input: IRoom): Promise<IRoom | null> {
    this.logger.debug('replace({id}, {input})', { id, input });
    const result = await this.repository.replace(id, input);
    this.logger.debug('replace: {result}', { result });

    return result;
  }

  async getParticipantById(
    roomId: string,
    participantId: string,
  ): Promise<IRoomParticipant | null> {
    this.logger.debug('getParticipantById({roomId, participantId})', {
      roomId,
      participantId,
    });
    const room = await this.repository.getById(roomId);
    if (!room) {
      return null;
    }
    const participant = room.participants.find((p) => p.id === participantId);
    this.logger.debug('getParticipantById: {participant}', { participant });

    return participant;
  }

  async getParticipantByUserId(
    roomId: string,
    userId: string,
  ): Promise<IRoomParticipant | null> {
    this.logger.debug('getParticipantByUserId({roomId, userId})', {
      roomId,
      userId,
    });
    const room = await this.repository.getById(roomId);
    if (!room) {
      return null;
    }
    const participant = room.participants.find((p) => p.userId === userId);
    this.logger.debug('getParticipantByUserId: {participant}', { participant });

    return participant;
  }

  async patchParticipant(
    roomId: string,
    participantId: string,
    patch: Partial<Omit<IRoomParticipant, 'id' | 'createdAt'>>,
  ): Promise<IRoomParticipant> {
    this.logger.debug('replace({roomId, participantId, patch})', {
      roomId,
      participantId,
      patch,
    });
    const room = await this.repository.getById(roomId);
    if (!room) {
      return null;
    }
    const participant = room.participants.find((p) => p.id === participantId);
    if (!participant) {
      return null;
    }
    Object.assign(participant, patch);
    await this.repository.replace(roomId, room);

    this.logger.debug('patchParticipant: {participant}', { participant });
    return participant;
  }
}
