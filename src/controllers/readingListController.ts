import type { Context } from 'hono'
import { ReadingListService } from '../services/readingListService.js'

export const ReadingListController = {
  getAll: (c: Context) => {
    return c.json(ReadingListService.getAllLists())
  },
  
  create: async (c: Context) => {
    const { userId, name } = await c.req.json()
    const newList = ReadingListService.createList(userId, name)
    return c.json(newList, 201)
  },
  
  addBook: async (c: Context) => {
    const listId = c.req.param('id')
    const { bookId } = await c.req.json()
    const updatedList = ReadingListService.addBookToList(listId, bookId)
    if (!updatedList) return c.json({ message: 'Liste non trouvée' }, 404)
    return c.json(updatedList)
  },
  
  removeBook: (c: Context) => {
    const { listId, bookId } = c.req.param()
    const updatedList = ReadingListService.removeBookFromList(listId, bookId)
    if (!updatedList) return c.json({ message: 'Liste ou livre non trouvé' }, 404)
    return c.json(updatedList)
  }
}