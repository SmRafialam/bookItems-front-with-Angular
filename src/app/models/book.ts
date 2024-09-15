export interface Book {
    title: string;
    content: string;
    author: string;
    price: string;
    createdAt?: Date;
}

export interface PaginatedBooks {
    items: Book[];
    total: number;
  }