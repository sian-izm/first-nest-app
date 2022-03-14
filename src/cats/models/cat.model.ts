import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}
