import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../../core/constants';
import { usersProviders } from './users.providers';

import { UsersService } from './users.service';
import { UserStub } from './users.stub';

describe('UsersService', () => {
  let service: UsersService;
  let users;
  beforeEach(async () => {
    users = [];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, 
        { 
          provide: USER_REPOSITORY,
          useValue: {
            create: jest.fn().mockResolvedValue(UserStub()),
            findOne: jest.fn().mockResolvedValue(UserStub()),
          } 
        }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should succeed to create new ', async () => {
    const stub = UserStub();
    let err;
    let res;
    try {
      res =  await service.create(stub);
    } catch(error) {
      err = error;
    }
    expect(err).toBeUndefined()
    expect(res.username).toEqual(stub.username)
  });
  it('should succeed to get user ', async () => {
    const stub = UserStub();
    let err;
    let res;
    try {
      res =  await service.findOneByEmail(stub.email);
    } catch(error) {
      err = error;
    }
    expect(err).toBeUndefined()
    expect(res.username).toEqual(stub.username)
  });
  it('should succeed to get user ', async () => {
    const stub = UserStub();
    let err;
    let res;
    try {
      res =  await service.findOneById(stub.id);
    } catch(error) {
      err = error;
    }
    expect(err).toBeUndefined()
    expect(res.username).toEqual(stub.username)
  });
});
