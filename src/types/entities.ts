export interface Admin {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  userId: string;
  fcmToken?: string | null;
  lastActiveAt: string; // ISO string from API
  createdAt: string;
  updatedAt: string;
}
