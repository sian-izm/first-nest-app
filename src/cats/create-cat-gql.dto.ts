import { InputType, Field, Int, ID, Scalar } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class createCatGql {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => String!)
  name: string;

  @Field(() => Int!)
  age: number;

  @Field(() => String!)
  breed: string;
}
