import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PokemonStub } from '../monsters.stub';
import { CreateMonsterDto } from './create-monster.dto';

let payload;
describe('validation create monsters', () => {
  beforeEach(() => {
    payload = PokemonStub();
  });

  it('should throw error when passed empty name', async () => {
    payload.name = '';

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });

  it('should throw error when passed summary empty', async () => {
    payload.summary = '';

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });

  it('should throw error when passed description empty', async () => {
    payload.description = '';

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
  it('should throw error when passed height minus', async () => {
    payload.height = -1;

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
  it('should throw error when passed weight minus', async () => {
    payload.weight = -1;

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
  it('should throw error when passed health minus', async () => {
    payload.health = -1;

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
  it('should throw error when passed health over 500', async () => {
    payload.health = 520;

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
  it('should throw error when passed speed over 500', async () => {
    payload.speed = -1;

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
  it('should throw error when passed speed over 500', async () => {
    payload.speed = 520;

    const transform = plainToInstance(CreateMonsterDto, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
});
