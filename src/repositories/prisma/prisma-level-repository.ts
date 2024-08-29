import { prisma } from "@/lib/prisma";
import { LevelRepository } from "../level-repository";
import { Level, Prisma } from "@prisma/client";
import { ResourceNotFound } from "@/services/errors/general-errors";
import { connect } from "http2";

export class PrismaLevelRepository implements LevelRepository {
  async create(data: Prisma.LevelUncheckedCreateInput) {
    try {
      const level = await prisma.level.create({
        data: {
          ...data,

        }
      })
      return level
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findById(levelId: string) {
    try {
      const level = await prisma.level.findUnique({
        where: {
          id: levelId,
        },
        select: {
          id: true,
          title: true,
          goldReward: true,
          hardSkillsBadges: true,
          softSkillsBadges: true,
          xpRequired: true,
          previousLevelId: true,
          companyId: true,
          nextLevel: {
            select: {
              id: true,
              title: true
            }
          },
          previousLevel: {
            select: {
              id: true,
              title: true
            }
          },
          users: {
            select: {
              id: true,
              username: true,
              avatarUrl: true
            }
          }
        }
      })

      if (!level) return null

      return level
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async listByCompany(companyId: string): Promise<Level[]> {
    try {
      const levels = await prisma.level.findMany({
        where: {
          companyId,
        },
        include: {
          nextLevel: true,
        }
      })

      return levels
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete(levelId: string) {
    try {
      const levelWithRelations = await prisma.level.findUnique({
        where: {
          id: levelId
        },
        include: {
          users: {
            select: {
              id: true
            }
          }
        }
      })

      if (!levelWithRelations) {
        throw new ResourceNotFound('Level not found')
      }

      const { users } = levelWithRelations

      await prisma.$transaction([
        prisma.level.update({
          where: {
            id: levelId
          },
          data: {
            users: {
              disconnect: users.map(user => ({ id: user.id }))
            }
          }
        }),
        prisma.level.delete({
          where: {
            id: levelId
          }
        })
      ])
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async update(levelId: string, data: Prisma.LevelUncheckedUpdateInput) {
    try {
      const updatedLevel = await prisma.level.update({
        where: {
          id: levelId,
        },
        data,
      })

      return updatedLevel
    } catch (error: any) {
      throw new Error(error)
    }
  }
}