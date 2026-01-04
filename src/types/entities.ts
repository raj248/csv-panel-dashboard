export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  books: Book[];
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
  entries?: Entry[];
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Entry {
  id: string;
  book?: Book;
  createdAt: string;
  updatedAt: string;

  // Entry Fields
  openingStock: number;
  printedCopies: number;
  soldCopies: number;
  returnCopies: number;
  mrp: number;
  amount: number;
  complimentaryDamage: number;
  closingStock: number;

  fromDate?: string;
  toDate?: string;
}
