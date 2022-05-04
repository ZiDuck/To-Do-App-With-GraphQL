import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionResolver } from './collection.resolver';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  providers: [CollectionResolver, CollectionService, UserService],
  exports: [CollectionService]
})
export class CollectionModule {}
