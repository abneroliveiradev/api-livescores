import { IsInt, IsString } from 'class-validator';

export class CreateEventDto {
  @IsInt()
  gameMinute: string;
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
