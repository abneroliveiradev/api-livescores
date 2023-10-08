import { Competition } from '../entities/competition.entity';
import { Team } from '../entities/team.entity';

export class EventInput {
  id?: number;
  startTime: Date;
  status: 'live' | 'scheduled' | 'finished';
  teamA: Team;
  pointsTeamA: number;
  teamB: Team;
  pointsTeamB: number;
  competition: Competition;
}
