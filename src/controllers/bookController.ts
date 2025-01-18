import type { Context } from 'hono'
import { BookService } from '../services/bookService.js'

export const BookController = {
  getAll: (c: Context) => {
    return c.json(BookService.getAllBooks())
  },
  
  getOne: (c: Context) => {
    const id = c.req.param('id')
    const book = BookService.getBookById(id)
    if (!book) return c.json({ message: 'Livre non trouvé' }, 404)
    return c.json(book)
  },
  
  create: async (c: Context) => {
    const body = await c.req.json()
    const newBook = BookService.createBook(body)
    return c.json(newBook, 201)
  },
  
  update: async (c: Context) => {
    const id = c.req.param('id')
    const body = await c.req.json()
    const updatedBook = BookService.updateBook(id, body)
    if (!updatedBook) return c.json({ message: 'Livre non trouvé' }, 404)
    return c.json(updatedBook)
  },
  
  delete: (c: Context) => {
    const id = c.req.param('id')
    const success = BookService.deleteBook(id)
    if (!success) return c.json({ message: 'Livre non trouvé' }, 404)
    return c.json({ message: 'Livre supprimé' })
  }
}