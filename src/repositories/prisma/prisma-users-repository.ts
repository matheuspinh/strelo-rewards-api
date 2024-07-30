import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async listByCompanyId(companyId: string) {
    const users = await prisma.user.findMany({
      where: {
        companyId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        companyId: true,
        role: true,
        avatarUrl: true,
        xp: true,
        gold: true,
        createdAt: true,
        updatedAt: true,
        completedMissionsIDs: true,
        missionsIDs: true,
      }
    })

    return users
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }

  async update(userId: string, data: Prisma.UserUncheckedUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })

    return user
  }
}
