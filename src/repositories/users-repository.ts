import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  listByCompanyId(companyId: string): Promise<User[]>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
}
