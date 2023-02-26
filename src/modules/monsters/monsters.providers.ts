import { MOSNTER_REPOSITORY } from '../../core/constants';
import { Monster } from './entities/monster.entity';

export const monstersProviders = [
    {
        provide: MOSNTER_REPOSITORY,
        useValue: Monster,
    },
];
