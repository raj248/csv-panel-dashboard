export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}
