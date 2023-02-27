import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';

@Table
export class Monster extends Model<Monster> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  summary: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  category: string[];

  @Column({
    type: DataType.FLOAT,
  })
  height: number;

  @Column({
    type: DataType.FLOAT,
  })
  weight: number;

  @Column({
    type: DataType.FLOAT,
  })
  health: number;

  @Column({
    type: DataType.FLOAT,
  })
  attack: number;

  @Column({
    type: DataType.FLOAT,
  })
  defense: number;

  @Column({
    type: DataType.FLOAT,
  })
  speed: number;

  @BelongsToMany(() => User, () => Monster)
  users: User[];
}
