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

  create(cat: Cat) {
    console.log(cat);
    this.catsRepository.save(cat);
    return this.catsRepository.findOne(cat.id);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }
}
