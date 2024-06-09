import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoomSessionRtpCapabilitiesQuery } from '@api/rtc/cqrs/queries';
import { RtpCapabilitiesDto } from '@api/rtc/dtos';
import { Logger, NotFoundException } from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';

@QueryHandler(GetRoomSessionRtpCapabilitiesQuery)
export class GetRoomSessionRtpCapabilitiesQueryHandler
  implements IQueryHandler<GetRoomSessionRtpCapabilitiesQuery>
{
  private readonly logger = new Logger(
    GetRoomSessionRtpCapabilitiesQueryHandler.name,
  );
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
  ) {}
  async execute(
    query: GetRoomSessionRtpCapabilitiesQuery,
  ): Promise<RtpCapabilitiesDto> {
    this.logger.debug('execute query');
    const session = this.roomSessionService.getById(query.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${query.sessionId} not found`);
    }

    const rtpCapabilities = this.rtcService.getRouterRtpCapabilities(
      session.routerId,
    );
    this.logger.debug(
      `session ${query.sessionId} rpt capabilities: {rtpCapabilities}`,
      { rtpCapabilities },
    );

    return rtpCapabilities;
  }
}
