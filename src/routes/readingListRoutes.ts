import { Hono } from 'hono'
import { ReadingListController } from '../controllers/readingListController.js'

const readingListRoutes = new Hono()

readingListRoutes.get('/', ReadingListController.getAll)
readingListRoutes.post('/', ReadingListController.create)
readingListRoutes.put('/:id/books', ReadingListController.addBook)
readingListRoutes.delete('/:listId/books/:bookId', ReadingListController.removeBook)

export default readingListRoutes