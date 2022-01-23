import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class createCatGql {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  breed: string;
}
