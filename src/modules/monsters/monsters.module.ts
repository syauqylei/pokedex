import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { RolesGuard } from '../../core/guards/roles.guard';
import { monstersProviders } from './monsters.providers';
import { usersProviders } from '../users/users.providers';

@Module({
  controllers: [MonstersController],
  providers: [MonstersService, ...monstersProviders, ...usersProviders]
})
export class MonstersModule {}
