import { AutoMap } from '@automapper/classes';

export class RtcpFeedbackDto {
  @AutoMap()
  type: string;

  @AutoMap()
  parameter?: string;
}
