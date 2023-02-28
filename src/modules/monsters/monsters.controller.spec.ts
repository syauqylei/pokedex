import { Test, TestingModule } from '@nestjs/testing';
import { MONSTER_REPOSITORY, USER_MONSTER_REPOSITORY } from '../../core/constants';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';

describe('MonstersController', () => {
  let controller: MonstersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonstersController],
      providers: [MonstersService, {
        provide: MONSTER_REPOSITORY,
        useValue: {}
      },{
        provide: USER_MONSTER_REPOSITORY,
        useValue: {}
      }],
    }).compile();

    controller = module.get<MonstersController>(MonstersController);
  });

  it('should be defined', () => {
  });
});
