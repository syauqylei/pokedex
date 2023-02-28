import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  MONSTER_REPOSITORY,
  USER_MONSTER_REPOSITORY,
  USER_REPOSITORY,
} from '../../core/constants';

import { UsersService } from './users.service';
import { UserStub } from './users.stub';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findByPk: jest.fn().mockImplementation((id) => {
              if (id === '83777298-686c-4460-9293-60b91116d827') {
                return null;
              }
              return {
                id: '83777298-686c-4460-9293-60b91116d828',
              };
            }),
            create: jest.fn().mockResolvedValue(UserStub())
          },
        },
        {
          provide: MONSTER_REPOSITORY,
          useValue: {
            findByPk: jest.fn().mockImplementation((id) => {
              if (id === '13777298-686c-4460-9293-60b91116d827') {
                return null;
              }
              return {
                id: '13777298-686c-4460-9293-60b91116d828',
              };
            }),
          },
        },
        {
          provide: USER_MONSTER_REPOSITORY,
          useValue: {
            create: jest.fn().mockImplementation((id) => {
              return {
                userId: '83777298-686c-4460-9293-60b91116d828',
                monsterId: '13777298-686c-4460-9293-60b91116d828',
              };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should succeed to create new ', async () => {
    const stub = UserStub();
    let err;
    let res;
    try {
      res = await service.create(stub);
    } catch (error) {
      err = error;
    }
    expect(err).toBeUndefined();
    expect(res.username).toEqual(stub.username);
  });
  describe('Testing toggle mark catched monster', () => {
    it('should throw error when not found monster id', async () => {
      let err;
      let res;
      const userId = '83777298-686c-4460-9293-60b91116d827';
      const monsterId = '13777298-686c-4460-9293-60b91116d827';
      try {
        res = await service.toggleMarkCatch(userId, monsterId);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequestException);
    });
    it('should return success', async () => {
      let err;
      let res;
      const userId = '83777298-686c-4460-9293-60b91116d827';
      const monsterId = '13777298-686c-4460-9293-60b91116d828';
      try {
        res = await service.toggleMarkCatch(userId, monsterId);
      } catch (error) {
        err = error;
      }
      expect(err).toBeUndefined();
      expect(res.success).toEqual(true);
    });
  });
});
