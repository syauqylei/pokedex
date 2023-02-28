import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { User, UserMonster } from './user.entity';
import { UserDto } from './dto/user.dto';
import {
  MONSTER_REPOSITORY,
  USER_MONSTER_REPOSITORY,
  USER_REPOSITORY,
} from '../../core/constants';
import { Monster } from '../monsters/entities/monster.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(MONSTER_REPOSITORY)
    private readonly monsterRepository: typeof Monster,
    @Inject(USER_MONSTER_REPOSITORY)
    private readonly userMonsterRepository: typeof UserMonster,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }
  async findOneByEmail(email: string): Promise<User> {
      return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
      return await this.userRepository.findOne<User>({ where: { id } });
  }
  async toggleMarkCatch(id: string, monsterId: string) {
    const monster = await this.monsterRepository.findByPk(monsterId);
    if (!monster) {
      throw new BadRequestException('MonsterId is not found');
    }
    const createUserMonster = {
      userId: id,
      monsterId,
      cathed: true,
    };
    const userMonster = await this.userMonsterRepository.create(
      createUserMonster,
    );
    return {
      success: true,
      userId: userMonster.userId,
      monsterId: userMonster.monsterId,
    };
  }
}
