import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository, UserWithAssociations } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          missions: {
            select: {
              id: true,
              title: true,
              description: true,
              xp: true,
              gold: true,
              users: true,
              badges: true,
              imageUrl: true,
            }
          },
          badges: true,
          completedMissions: true,
          privileges: true,
        }
      })

      return user as unknown as UserWithAssociations
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async listByCompanyId(companyId: string) {
    try {
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
          badgesIDs: true,
          completedMissions: true,
          missions: true,
        }
      })

      return users
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    try {
      const user = await prisma.user.create({
        data,
      })

      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete(userId: string) {
    try {
      const missionsWithUser = await prisma.mission.findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      })

      const badgesWithUser = await prisma.badge.findMany({
        where: {
          earnedBy: {
            some: {
              id: userId,
            },
          },
        },
      })

      const [, user] = await prisma.$transaction([
        prisma.user.update({
          where: {
            id: userId
          },
          data: {
            missions: {
              disconnect: missionsWithUser.map(mission => ({ id: mission.id }))
            },
            badges: {
              disconnect: badgesWithUser.map(badge => ({ id: badge.id }))
            }
          }
        }),
        prisma.user.delete({
          where: {
            id: userId,
          },
        })
      ])
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async update(userId: string, data: Prisma.UserUncheckedUpdateInput) {
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data,
      })

      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
