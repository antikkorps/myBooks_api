import { Book } from '../models/book.js'
import { ReadingList } from '../models/readingList.js'

export const ReadingListService = {
  getAllLists: () => {
    return ReadingList.findAll({
      include: [Book]
    })
  },
  
  getListById: (id: string) => {
    return ReadingList.findByPk(id, {
      include: [Book]
    })
  },
  
  createList: (userId: string, name: string) => {
    return ReadingList.create({
      userId,
      name
    })
  },
  
  addBookToList: async (listId: string, bookId: string) => {
    const list = await ReadingList.findByPk(listId)
    const book = await Book.findByPk(bookId)
    
    if (!list || !book) return null
    await list.$add('books', book)
    return list.reload({
      include: [Book]
    })
  },
  
  removeBookFromList: async (listId: string, bookId: string) => {
    const list = await ReadingList.findByPk(listId)
    const book = await Book.findByPk(bookId)
    
    if (!list || !book) return null
    await list.$remove('books', book)
    return list.reload({
      include: [Book]
    })
  }
}