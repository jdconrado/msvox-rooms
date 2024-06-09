import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RtcpFeedbackDto {
  @AutoMap()
  @ApiProperty({ example: 'goog-remb' })
  type: string;

  @AutoMap()
  @ApiPropertyOptional({ example: '' })
  parameter?: string;
}
