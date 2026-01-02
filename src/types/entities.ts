export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

// books: isbn, name, price, print year, author
export interface Book {
  id: string;
  isbn: string;
  name: string;
  price?: number;
  year?: number;
  author?: string;
  language?: string;
  category?: string;
  publisher?: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
