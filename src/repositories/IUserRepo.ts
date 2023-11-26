import { User } from '../entities/User';

export type IUserRepo = {
  findOneById: (id: number) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  createOne: (user: User) => Promise<User | null>;
}
