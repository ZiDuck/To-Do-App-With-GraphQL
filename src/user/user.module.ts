import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CollectionModule } from 'src/collection/collection.module';

@Module({
  imports: [CollectionModule],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
