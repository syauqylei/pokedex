import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MONSTER_REPOSITORY, USER_MONSTER_REPOSITORY } from '../../core/constants';
import { MonstersService } from './monsters.service';
import { PokemonStub } from './monsters.stub';

describe('MonstersService', () => {
  let service: MonstersService;
  let pokemons;
  beforeEach(async () => {
    pokemons = [];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonstersService,
        {
          provide: MONSTER_REPOSITORY,
          useValue: {
            create: jest.fn().mockImplementation((pokemon) => {
              const isExist = pokemons.find(
                (item) => item.name === pokemon.name,
              );
              if (isExist) throw new Error();
              pokemons.push(pokemon);
              return pokemon;
            }),
            findAll: jest.fn().mockImplementation((opt: any) => {
              return [PokemonStub()]
            }),
            findByPk: jest.fn().mockImplementation((id) => {
              if (id === '4e3cee99-ddc0-4aab-b224-ea9614ca5a10') {
                return null;
              }
              if (id === '13777298-686c-4460-9293-60b91116d827') {
                return null
              }
              return {
                ...PokemonStub(),
                destroy: jest.fn().mockResolvedValue(null),
                update: jest.fn().mockResolvedValue(null),
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

    service = module.get<MonstersService>(MonstersService);
  });

  describe('Testing Create Pokemon', () => {
    it('should throw error when pokemon is already exist', async () => {
      let res;
      let err;
      const pokemon = PokemonStub();
      pokemons.push(pokemon);
      try {
        res = await service.create(pokemon);
      } catch (error) {
        err = error;
      }
      expect(res).toBeUndefined();
      expect(err).toBeDefined();
    });

    it('should return created pokemon', async () => {
      let res;
      let err;
      const pokemon = PokemonStub();
      try {
        res = await service.create(pokemon);
      } catch (error) {
        err = error;
      }
      expect(err).toBeUndefined();
      expect(res).toBeDefined();
    });
  });

  describe('Testing getPokemons', () => {
    it('should return category', async () => {
      let res;
      let err;
      const userId = '4e3cee99-ddc0-4aab-b224-ea9614ca5a10';
      try {
        res = await service.getMonsters(userId);
      } catch (error) {
        err = error
      }
      expect(err).toBeUndefined();
      expect(res).toHaveLength(1)
    })
  })

  describe('Testing remove', () => {
    it('should throw NotFound when id is not found', async () => {
      let res;
      let err;
      const id = '4e3cee99-ddc0-4aab-b224-ea9614ca5a10';
      try {
        res = await service.remove(id);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(NotFoundException);
    });

    it('should success to remove pokemon', async () => {
      let res;
      let err;
      const id = '4e3cee99-ddc0-4aab-b224-ea9614ca5a11';
      try {
        res = await service.remove(id);
      } catch (error) {
        err = error;
      }
      expect(err).toBeUndefined();
      expect(res.id).toEqual(id);
      expect(res.success).toEqual(true);
    });
  });

  describe('Testing update', () => {
    it('should throw NotFound when id is not found', async () => {
      let res;
      let err;
      const id = '4e3cee99-ddc0-4aab-b224-ea9614ca5a10';
      try {
        res = await service.update(id, {});
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(NotFoundException);
    });

    it('should return success when update is success', async () => {
      let res;
      let err;
      const payload = PokemonStub();
      payload.name = 'geodude';
      const id = '4e3cee99-ddc0-4aab-b224-ea9614ca5a11';
      try {
        res = await service.update(id, payload);
      } catch (error) {
        err = error;
      }
      expect(err).toBeUndefined();
      expect(res.id).toEqual(id);
      expect(res.success).toEqual(true);
    });
  });

  describe('Testing findOne', () => {
    it('should throw NotFound when id is not found', async () => {
      let res;
      let err;
      const id = '4e3cee99-ddc0-4aab-b224-ea9614ca5a10';
      try {
        res = await service.findOne(id);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(NotFoundException);
    });

    it('should return pokemon', async () => {
      let res;
      let err;
      const id = '4e3cee99-ddc0-4aab-b224-ea9614ca5a11';
      try {
        res = await service.findOne(id);
      } catch (error) {
        err = error;
      }
      expect(err).toBeUndefined();
      expect(res.name).toEqual(PokemonStub().name);
    });
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
