import { InputType, Field, Int, ID, Scalar } from "@nestjs/graphql";

@InputType()
export class createCatGql {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}
