import { IsUUID } from 'class-validator';

export class ParamsMonsterDTO {
  @IsUUID()
  id: string;
}
