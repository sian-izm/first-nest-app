import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';

@Resolver()
export class CatsResolver {
  constructor(private readonly catService: CatsService) {}

  @Query(() => [Cat], { nullable: 'items' })
  findAll() {
    return this.catService.findAll();
  }

  @Query(() => Cat)
  findOne(@Args('id', { type: () => ID}) id: number) {
    return this.catService.findOne(id);
  }
}
