import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Cat {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => Int )
  age: number;

  @Field()
  breed: string;
}
