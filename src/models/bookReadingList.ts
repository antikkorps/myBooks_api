import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Book } from './book.js';
import { ReadingList } from './readingList.js';

@Table({
  tableName: 'book_reading_list',
  timestamps: true
})
export class BookReadingList extends Model {
  @ForeignKey(() => Book)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare bookId: string;

  @ForeignKey(() => ReadingList)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare readingListId: string;
}