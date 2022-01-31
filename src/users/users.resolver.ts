import { Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/users/current-user";
import { GqlAuthGuard } from "src/auth/gql-auth-guard";
import { User } from "./user.model";
import { UsersService } from "./users.service";

export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Query(returns => User)
  // @UseGuards(GqlAuthGuard)
  // whoAmI(@CurrentUser() user: User) {
  //   return this.usersService.findOne(user.name);
  // }
}