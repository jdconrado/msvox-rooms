
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectRoomSessionRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
