import { z } from "@hono/zod-openapi"
import type { GoogleBooksResponse } from "../types/google.js"

export const GoogleBookSchema = z.object({
  id: z.string(),
  volumeInfo: z.object({
    title: z.string(),
    authors: z.array(z.string()).optional(),
    publishedDate: z.string().optional(),
    description: z.string().optional(),
    imageLinks: z
      .object({
        thumbnail: z.string().optional(),
      })
      .optional(),
    industryIdentifiers: z
      .array(
        z.object({
          type: z.string(),
          identifier: z.string(),
        })
      )
      .optional(),
    pageCount: z.number().optional(),
    categories: z.array(z.string()).optional(),
    language: z.string().optional(),
  }),
})

export type GoogleBook = z.infer<typeof GoogleBookSchema>

const GOOGLE_BOOKS_API = process.env.GOOGLE_BOOKS_API

export class GoogleBooksService {
  async searchBooks(query: string): Promise<GoogleBook[]> {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}`)
      const data = (await response.json()) as GoogleBooksResponse

      return (data.items ?? []).reduce<GoogleBook[]>((acc, item) => {
        const bookResult = GoogleBookSchema.safeParse(item)
        if (bookResult.success) {
          acc.push(bookResult.data)
        }
        return acc
      }, [])
    } catch (error) {
      console.error("Error searching books:", error)
      throw new Error("Failed to search books")
    }
  }

  async getBookById(googleBookId: string): Promise<GoogleBook> {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API}/${googleBookId}`)
      const data = await response.json()

      const bookResult = GoogleBookSchema.safeParse(data)
      if (!bookResult.success) {
        throw new Error("Invalid book data from Google Books API")
      }

      return bookResult.data
    } catch (error) {
      console.error("Error fetching book:", error)
      throw new Error("Failed to fetch book details")
    }
  }

  transformToBookModel(googleBook: GoogleBook) {
    return {
      title: googleBook.volumeInfo.title,
      authors: googleBook.volumeInfo.authors?.join(", "),
      publishedDate: googleBook.volumeInfo.publishedDate,
      description: googleBook.volumeInfo.description,
      isbn: googleBook.volumeInfo.industryIdentifiers?.[0]?.identifier,
      pageCount: googleBook.volumeInfo.pageCount,
      categories: googleBook.volumeInfo.categories?.join(", "),
      imageUrl: googleBook.volumeInfo.imageLinks?.thumbnail,
      language: googleBook.volumeInfo.language,
    }
  }
}
