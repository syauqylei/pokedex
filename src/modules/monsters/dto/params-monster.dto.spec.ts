import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ParamsMonsterDTO } from './params-monster.dto';

let payload;

describe('validation params request', () => {
  beforeEach(() => {
    payload = {
      id: '4e3cee99-ddc0-4aab-b224-ea9614ca5a10',
    };
  });

  it('should throw error when id is not UUID v4', async () => {
    payload.id = '1';

    const transform = plainToInstance(ParamsMonsterDTO, payload);
    const error = await validate(transform);
    expect(error).not.toHaveLength(0);
  });
});
