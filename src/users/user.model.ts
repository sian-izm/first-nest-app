import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  password: string;
}
