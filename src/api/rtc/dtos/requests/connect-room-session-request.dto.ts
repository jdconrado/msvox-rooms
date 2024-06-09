import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectRoomSessionRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Session Id' })
  sessionId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User Id' })
  userId: string;
}
