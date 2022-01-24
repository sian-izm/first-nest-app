import { Injectable } from '@nestjs/common';
import { Cat } from './models/cat.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ){}

  create(cat: Cat): Promise<Cat> {
    return this.catsRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
