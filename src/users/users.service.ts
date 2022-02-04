import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(name: string): Promise<User> {
    return this.userRepository.findOne({name: name})
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
