import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"
import { Book } from "../models/book.js"
import { GoogleBooksService } from "../services/googleBooksService.js"

const googleBooks = new Hono()
const googleBooksService = new GoogleBooksService()

const searchQuerySchema = z.object({
  q: z.string().min(1, "Search query is required"),
})

const addBookSchema = z.object({
  googleBookId: z.string().min(1, "Google Book ID is required"),
})

googleBooks.get("/search", zValidator("query", searchQuerySchema), async (c) => {
  const { q } = c.req.valid("query")

  try {
    const books = await googleBooksService.searchBooks(q)
    return c.json(books)
  } catch (error) {
    return c.json({ message: "Failed to search books" }, 500)
  }
})

googleBooks.post("/add", zValidator("json", addBookSchema), async (c) => {
  const { googleBookId } = c.req.valid("json")

  try {
    const googleBook = await googleBooksService.getBookById(googleBookId)
    const bookData = googleBooksService.transformToBookModel(googleBook)
    const newBook = await Book.create(bookData)

    return c.json(newBook, 201)
  } catch (error) {
    return c.json({ message: "Failed to add book" }, 500)
  }
})

export default googleBooks
