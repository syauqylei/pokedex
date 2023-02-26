import { Inject, Injectable } from '@nestjs/common';
import { queryBuilder } from '../../core/utils';
import { MONSTER_REPOSITORY } from '../../core/constants';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from './entities/monster.entity';
import { QueryOptions } from './monsters.interfaces';

@Injectable()
export class MonstersService {
  constructor(
    @Inject(MONSTER_REPOSITORY)
    private readonly monsterRepository: typeof Monster,
  ) {}
  async create(createMonsterDto: CreateMonsterDto) {
    const ret = await this.monsterRepository.create(createMonsterDto);
    return ret;
  }

  async findAll(opt: QueryOptions) {
    const queryOpt = queryBuilder(opt);
    console.log(queryOpt);
    const ret = await this.monsterRepository.findAll(queryOpt);
    return ret;
  }

  findOne(id: number) {
    return `This action returns a #${id} monster`;
  }

  update(id: number, updateMonsterDto: UpdateMonsterDto) {
    return `This action updates a #${id} monster`;
  }

  remove(id: number) {
    return `This action removes a #${id} monster`;
  }
}
