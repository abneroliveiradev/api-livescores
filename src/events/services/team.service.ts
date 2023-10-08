import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamService {
  findAll() {
    return `This action returns all team`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }
}
