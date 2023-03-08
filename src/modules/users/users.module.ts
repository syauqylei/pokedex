import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { monstersProviders } from '../monsters/monsters.providers';

@Module({
  providers: [UsersService, ...usersProviders,...monstersProviders],
  exports: [UsersService],
})
export class UsersModule {}
