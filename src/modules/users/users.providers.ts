import { User, UserMonster } from './user.entity';
import { USER_MONSTER_REPOSITORY, USER_REPOSITORY } from '../../core/constants';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: USER_MONSTER_REPOSITORY,
    useValue: UserMonster,
  },
];
