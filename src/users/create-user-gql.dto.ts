import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class createUserGql {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  password: string;
}
