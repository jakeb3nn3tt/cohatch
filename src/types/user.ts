export enum UserRole {
  SELLER = 'SELLER',
  COSTUMER = 'COSTUMER',
}

export type User = {
  id: string;
  email: string;
  password: string;
  role?: UserRole;
  name?: string;
};
