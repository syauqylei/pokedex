import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { queryBuilder } from '../../core/utils';
import { MONSTER_REPOSITORY } from '../../core/constants';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { Monster } from './entities/monster.entity';
import { fn } from 'sequelize';
import { Op } from 'sequelize';
import { UserMonster } from '../users/user.entity';
import { UpdateMonsterDto } from './dto/update-monster.dto';

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

  async getMonsters(userId: string, categories: string[] = [], catched: number = -1): Promise<Monster[]> {
    let ret = []
    let filterCategory = {}
    let filterCatched = { userId }
    if (catched !== -1) {
      const catchedBool = !!catched
      Object.assign(filterCatched, { catched: catchedBool })
    }
    if (categories.length) {
      Object.assign(filterCategory, {
        category: {
          [Op.any] : fn('ARRAY',categories.map(String)),
        },
      })
    }
    ret = await this.monsterRepository.findAll({
      where: filterCategory,
      include: [
        {
          model: UserMonster,
          where: filterCatched,
        }
      ]
    });
    return ret;
  }

  async findOne(id: string): Promise<Monster>{
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
