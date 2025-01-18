import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { BookReadingList } from './bookReadingList.js';
import { ReadingList } from './readingList.js';

@Table({
  tableName: 'books',
  timestamps: true
})
export class Book extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare author: string;

  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare isbn: string;

  @Column({
    type: DataType.ENUM('available', 'borrowed'),
    defaultValue: 'available'
  })
  declare status: 'available' | 'borrowed';

  @BelongsToMany(() => ReadingList, () => BookReadingList)
  declare readingLists: ReadingList[];
}