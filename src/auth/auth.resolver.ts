import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/users/user.model';
import { createUserGql } from 'src/users/create-user-gql.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args('input') createUser: createUserGql) {
    return this.authService.register(createUser);
  }
}
