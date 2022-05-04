import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entity/user.entity';

@ObjectType()
export class Collection {
  @Field(() => Int)
  id: number;

  @Field()
  nameCollection: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(type => Int)
  userId: number;

  @Field(type => User)
  user?: User

  @Field(type => [Task], { nullable: true })
  tasks?: Task[]
}
