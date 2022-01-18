import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class CatResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello';
  }

}
