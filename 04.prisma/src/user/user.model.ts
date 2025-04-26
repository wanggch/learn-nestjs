export interface User {
  id: string;
  username: string;
  password: string;
  status: UserStatus;
}

export enum UserStatus {
  NORMAL = 'NORMAL',
  LOCKED = 'LOCKED'
}