import { Prisma, User } from '@prisma/client'

export type UserWithoutPassword = Omit<User, 'passwordHash'>
export interface UsersRepository {
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  listByCompanyId(companyId: string): Promise<UserWithoutPassword[]>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
}
