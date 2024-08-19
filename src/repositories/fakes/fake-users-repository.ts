import { Prisma, User } from '@prisma/client'
import { UsersRepository, UserWithAssociations } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class FakeUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user as unknown as UserWithAssociations
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async listByCompanyId(companyId: string) {
    const users = this.items.filter((item) => item.companyId === companyId)

    return users
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: randomUUID(),
      username: data.username,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarUrl: null,
      xp: 0,
      gold: 0,
      companyId: data.companyId || '1',
      role: data.role || 'user',
      missionsIDs: [] as string[],
      completedMissionsIDs: [] as string[],
      badgesIDs: [] as string[],
      privilegesIDs: [] as string[],
    }

    this.items.push(user)

    return user
  }

  delete(userId: string): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.items.splice(userIndex, 1)

    return Promise.resolve()
  }

  update(userId: string, data: Prisma.UserUncheckedUpdateInput) {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const user = this.items[userIndex]

    Object.assign(user, data)

    this.items[userIndex] = user

    return Promise.resolve(this.items[userIndex])
  }
}
