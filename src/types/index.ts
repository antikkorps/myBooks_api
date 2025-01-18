export interface Book {
    id: string
    title: string
    author: string
    isbn: string
    status: 'available' | 'borrowed'
    addedAt: string
  }
  
  export interface ReadingList {
    id: string
    userId: string
    name: string
    books: string[]
    createdAt: string
  }
  