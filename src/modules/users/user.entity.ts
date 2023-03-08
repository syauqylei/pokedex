import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Monster } from '../monsters/entities/monster.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.ENUM,
    values: ['admin', 'user'],
  })
  role: string;

  @BelongsToMany(() => Monster, () => UserMonster)
  monsters: Monster[];
}

@Table
export class UserMonster extends Model<UserMonster> {
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Monster)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  monsterId: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  catched: boolean;
}
