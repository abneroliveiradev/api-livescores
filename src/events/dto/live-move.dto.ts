import { IsInt, IsString } from 'class-validator';

export class LiveMoveDto {
  @IsInt()
  minute: number;

  @IsInt()
  eventId: number;

  @IsString()
  description: string;
}
