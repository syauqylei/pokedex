import { FindOptions } from 'sequelize';
import { Monster } from 'src/modules/monsters/entities/monster.entity';
import { QueryOptions } from '../modules/monsters/monsters.interfaces';
import { DEFAULT_ITEMS_PER_PAGE } from './constants';

export const queryBuilder = (opt: QueryOptions)=> {
  const { page, itemsPerPage } = opt;
  const filter = {};
  if (!page) {
    Object.assign(filter, { limit: DEFAULT_ITEMS_PER_PAGE });
  } else if (page === 1) {
    Object.assign(filter, { limit: itemsPerPage });
    return filter;
  } else {
    Object.assign(filter, {
      limit: page * itemsPerPage,
      offset: (page - 1) * itemsPerPage,
    });
    return filter;
  }
};
