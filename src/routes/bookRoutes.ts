import { Hono } from 'hono'
import { BookController } from '../controllers/bookController.js'

const bookRoutes = new Hono()

bookRoutes.get('/', BookController.getAll)
bookRoutes.get('/:id', BookController.getOne)
bookRoutes.post('/', BookController.create)
bookRoutes.put('/:id', BookController.update)
bookRoutes.delete('/:id', BookController.delete)

export default bookRoutes