import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Book } from './book.js';
import { BookReadingList } from './bookReadingList.js';
import { User } from './user.js';

@Table({
  tableName: 'reading_lists',
  timestamps: true
})
export class ReadingList extends Model {
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
  declare name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsToMany(() => Book, () => BookReadingList)
  declare books: Book[];
}