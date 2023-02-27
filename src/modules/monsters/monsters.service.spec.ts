import {
  BadGatewayException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MONSTER_REPOSITORY } from '../../core/constants';
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
              if (opt.limit && opt.itemsPerPage) {
                return new Array(opt.itemsPerPage).fill(PokemonStub());
              } else if (opt.limit) {
                return new Array(opt.limit).fill(PokemonStub());
              }
            }),
            findByPk: jest.fn().mockImplementation((id) => {
              if (id === '4e3cee99-ddc0-4aab-b224-ea9614ca5a10') {
                return null;
              }
              return {
                ...PokemonStub(),
                destroy: jest.fn().mockResolvedValue(null),
                update: jest.fn().mockResolvedValue(null),
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

  // it('should limit returns pokemon to default 10', async () => {
  //   let res;
  //   let err;
  //   try {
  //     res = await service.findAll({});
  //   } catch (error) {
  //     err = error;
  //   }

  //   expect(err).toBeUndefined();
  //   expect(res).toHaveLength(10);
  // });

  // it('should limit returns pokemon to default 10', async () => {
  //   let res;
  //   let err;
  //   try {
  //     res = await service.findAll({ page: 2, itemsPerPage: 5 });
  //   } catch (error) {
  //     err = error;
  //   }
  //   expect(err).toBeUndefined();
  //   expect(res).toHaveLength(5);
  // });
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
});
