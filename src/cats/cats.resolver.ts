import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';
import { createCatGql } from './create-cat-gql.dto';

// TODO: write tests
@Resolver()
export class CatsResolver {
  constructor(private readonly catService: CatsService) {}

  @Query(() => [Cat], { nullable: 'items' })
  async cats() {
    return this.catService.findAll();
  }

  @Query(() => Cat)
  async cat(@Args('id', { type: () => ID}) id: number) {
    return this.catService.findOne(id);
  }

  @Mutation(() => Cat)
  async createCat(@Args('createCat') createCat: createCatGql) {
    return this.catService.create(createCat);
  }
}
