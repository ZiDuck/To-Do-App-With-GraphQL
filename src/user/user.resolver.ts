import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CollectionService } from 'src/collection/collection.service';
import { Collection } from 'src/collection/entities/collection.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    private collectionService: CollectionService,
  ) {}

  @Query((returns) => [User], { name: 'getAllUsers' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query((returns) => User, { name: 'getCurrentUser' })
  findCurrentUser(@GetUser() currentUser: User): User {
    return currentUser;
  }

  @ResolveField()
  async collections(@Parent() user: User): Promise<Collection[]> {
    return this.collectionService.findAll(user.id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetUser() user: User
  ): Promise<User> {
    return this.userService.update(updateUserInput, user.id);
  }
}
