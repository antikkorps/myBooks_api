export interface GoogleBooksResponse {
  items?: Array<{
    id: string
    volumeInfo: {
      title: string
      authors?: string[]
      publishedDate?: string
      description?: string
      imageLinks?: {
        thumbnail?: string
      }
      industryIdentifiers?: Array<{
        type: string
        identifier: string
      }>
      pageCount?: number
      categories?: string[]
      language?: string
    }
  }>
}
