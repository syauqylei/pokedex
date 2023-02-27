import { ArrayNotEmpty, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateMonsterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  summary: string;

  @IsNotEmpty()
  description: string;

  @ArrayNotEmpty()
  category: string[];

  @Min(0)
  height: number;

  @Min(0)
  weight: number;

  @Max(500)
  @Min(0)
  health: number;

  @Max(500)
  @Min(0)
  attack: number;

  @Max(500)
  @Min(0)
  defense: number;

  @Max(500)
  @Min(0)
  speed: number;
}
