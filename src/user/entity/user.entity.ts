import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Collection } from 'src/collection/entities/collection.entity';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  passWord: string;

  @Field()
  name: string;
  
  @Field(type => [Collection], {nullable: true})
  collections?: Collection[];
}
