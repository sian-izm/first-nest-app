import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Cat {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field( {nullable: true })
  age: number;

  @Field()
  breed: string;
}
