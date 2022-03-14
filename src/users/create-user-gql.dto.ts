import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class createUserGql {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  password: string;
}
