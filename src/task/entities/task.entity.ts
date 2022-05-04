import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Collection } from 'src/collection/entities/collection.entity';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  nameTask: string;
  
  @Field()
  description: string;
  
  @Field()
  state: boolean;
  
  @Field()
  deadline: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(type => Int)
  collectionId: number;

  @Field(type => Collection, { nullable: true })
  collection?: Collection
}
