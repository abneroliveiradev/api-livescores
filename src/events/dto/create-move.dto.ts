import { IsInt, IsString } from 'class-validator';

export class CreateMoveDto {
  @IsInt()
  minute: number;

  @IsInt()
  eventId: number;

  @IsString()
  description: string;
}
