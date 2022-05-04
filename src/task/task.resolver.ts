import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

import { CollectionService } from 'src/collection/collection.service';
import { Collection } from 'src/collection/entities/collection.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService, private collectionService: CollectionService) {}

  @Mutation(() => Task, { name: 'createTask' })
  create(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
    return this.taskService.create(createTaskInput);
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task, { name: 'updateTask' })
  update(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput): Promise<Task> {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation(() => Task, { name: 'deleteTask' })
  delete(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.taskService.delete(id);
  }

  @ResolveField()
  collection(@Parent() task: Task): Promise<Collection> {
    return this.collectionService.findOne(task.collectionId);
  }
}
