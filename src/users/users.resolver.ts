import { Resolver, Args, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('name', { type: () => String }) name: string) {
    return this.usersService.findOne(name);
  }
}
