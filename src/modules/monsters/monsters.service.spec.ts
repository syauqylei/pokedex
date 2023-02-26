import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { Options } from 'sequelize';
import { Where } from 'sequelize/types/utils';
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
          },
        },
      ],
    }).compile();

    service = module.get<MonstersService>(MonstersService);
  });

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

  it('should limit returns pokemon to default 10', async () => {
    let res;
    let err;
    try {
      res = await service.findAll({});
    } catch (error) {
      err = error;
    }

    expect(err).toBeUndefined();
    expect(res).toHaveLength(10);
  });

  it('should limit returns pokemon to default 10', async () => {
    let res;
    let err;
    try {
      res = await service.findAll({ page: 2, itemsPerPage: 5 });
    } catch (error) {
      err = error;
    }
    expect(err).toBeUndefined();
    expect(res).toHaveLength(5);
  });
});
