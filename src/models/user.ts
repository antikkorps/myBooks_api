import bcrypt from 'bcrypt';
import { BeforeCreate, BeforeUpdate, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ReadingList } from './readingList.js';

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string;

  @HasMany(() => ReadingList)
  declare readingLists: ReadingList[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}