import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { Collection } from './entities/collection.entity';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { TaskService } from 'src/task/task.service';
import { Task } from 'src/task/entities/task.entity';

@Resolver(() => Collection)
@UseGuards(JwtAuthGuard)
export class CollectionResolver {
  constructor(
    private collectionService: CollectionService,
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  @Mutation(() => Collection, { name: 'createCollection' })
  create(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
    @GetUser() user: User,
  ): Promise<Collection> {
    return this.collectionService.create(createCollectionInput, user.id);
  }

  @Query(() => Collection, { name: 'collection' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Collection> {
    return this.collectionService.findOne(id);
  }

  @Mutation(() => Collection, { name: 'updateCollection' })
  update(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ): Promise<Collection> {
    return this.collectionService.update(
      updateCollectionInput.id,
      updateCollectionInput,
    );
  }

  @Mutation(() => Collection, { name: 'deleteCollection' })
  delete(@Args('id', { type: () => Int }) id: number): Promise<Collection> {
    return this.collectionService.delete(id);
  }

  @ResolveField()
  user(@Parent() collection: Collection): Promise<User> {
    return this.userService.findOne(collection.userId);
  }

  @ResolveField()
  tasks(@Parent() collection: Collection): Promise<Task[]> {
    return this.taskService.findAll(collection.id);
  }
}
