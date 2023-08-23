export enum UserRole {
  SELLER = 'SELLER',
  COSTUMER = 'COSTUMER',
}

export type User = {
  id: string;
  role?: UserRole;
  email?: string;
  password?: string;
};
