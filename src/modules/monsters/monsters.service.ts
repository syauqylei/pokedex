import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { queryBuilder } from '../../core/utils';
import { MONSTER_REPOSITORY } from '../../core/constants';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from './entities/monster.entity';
import { QueryOptions } from './monsters.interfaces';
import { validate } from 'class-validator';

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
    const ret = await this.monsterRepository.findAll(queryOpt);
    return ret;
  }

  async findOne(id: string) {
    const monster = await this.monsterRepository.findByPk(id);
    if (!monster) {
      throw new NotFoundException('Pokemon is not found');
    }
    return monster;
  }

  async update(id: string, updateMonsterDto: UpdateMonsterDto) {
    const monster = await this.monsterRepository.findByPk(id);
    if (!monster) {
      throw new NotFoundException('Pokemon is not found');
    }
    await monster.update(updateMonsterDto);
    return { success: true, id };
  }

  async remove(id: string) {
    const monster = await this.monsterRepository.findByPk(id);
    if (!monster) {
      throw new NotFoundException('Pokemon is not found');
    }
    await monster.destroy({ force: true });
    return { success: true, id };
  }
}
