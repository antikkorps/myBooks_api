import { Book } from '../models/book.js'

export const BookService = {
  getAllBooks: () => {
    return Book.findAll()
  },
  
  getBookById: (id: string) => {
    return Book.findByPk(id)
  },
  
  createBook: (bookData: Pick<Book, 'title' | 'author' | 'isbn'>) => {
    return Book.create(bookData)
  },
  
  updateBook: async (id: string, bookData: Partial<Book>) => {
    const book = await Book.findByPk(id)
    if (!book) return null
    return book.update(bookData)
  },
  
  deleteBook: async (id: string) => {
    const book = await Book.findByPk(id)
    if (!book) return false
    await book.destroy()
    return true
  }
}