import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  nameTask: string;

  @Field()
  description: string;

  @Field()
  deadline: Date;

  @Field(type => Int)
  collectionId: number;
}
