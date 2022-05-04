import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field()
  nameCollection: string;
}
