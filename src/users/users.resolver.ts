import { Resolver, Args, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth-guard';
import { CurrentUser } from './current-user';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('name', { type: () => String }) name: string) {
    return this.usersService.findOne(name);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User){
    return this.usersService.findOne(user.name);
  }
}
