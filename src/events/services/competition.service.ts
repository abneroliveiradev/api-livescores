import { Injectable } from '@nestjs/common';

@Injectable()
export class CompetitionService {
  findAll() {
    return `This action returns all competition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competition`;
  }
}
