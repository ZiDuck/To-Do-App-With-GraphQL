import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { CollectionModule } from 'src/collection/collection.module';
import { CollectionService } from 'src/collection/collection.service';

@Module({
  // imports: [CollectionModule],
  providers: [TaskResolver, TaskService, CollectionService],
  exports: [TaskService]
})
export class TaskModule {}
