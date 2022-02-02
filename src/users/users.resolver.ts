import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { createUserGql } from './create-user-gql.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('name', { type: () => String }) name: string) {
    return this.usersService.findOne(name);
  }

  @Mutation(() => User)
  async signup(@Args('input') createUser: createUserGql) {
    return this.usersService.create(createUser);
  }
}
