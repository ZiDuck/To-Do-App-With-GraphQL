import { CreateCollectionInput } from './create-collection.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @Field()
  id: number;

  @Field()
  nameCollection: string;
}
