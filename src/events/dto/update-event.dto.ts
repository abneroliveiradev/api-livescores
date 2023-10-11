import { IsInt, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsInt()
  id: number;

  @IsInt()
  gameMinute: number;

  @IsInt()
  competitionId: number;

  @IsInt()
  teamAId: number;

  @IsInt()
  teamBId: number;

  @IsInt()
  scoreA: number;

  @IsInt()
  scoreB: number;

  @IsString()
  startTime: string;

  @IsString()
  eventDescription: string;

  @IsString()
  status: string;
}
