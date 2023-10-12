import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoveDto } from '../dto/create-move.dto';
import { Move } from '../entities/move.entity';

@Injectable()
export class MovesService {
  constructor(
    @InjectRepository(Move)
    private movesRepository: Repository<Move>,
  ) {}

  async create(move: CreateMoveDto): Promise<Move> {
    const newData = this.movesRepository.create(move);
    const savedData = await this.movesRepository.save(newData);
    return savedData;
  }
}
