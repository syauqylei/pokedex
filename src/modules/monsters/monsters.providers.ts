import { MONSTER_REPOSITORY } from '../../core/constants';
import { Monster } from './entities/monster.entity';

export const monstersProviders = [
  {
    provide: MONSTER_REPOSITORY,
    useValue: Monster,
  },
];
