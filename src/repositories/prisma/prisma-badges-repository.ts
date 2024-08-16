import { Badge, Prisma } from "@prisma/client";
import { BadgesRepository } from "../badges-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBadgesRepository implements BadgesRepository {
  async create(data: Prisma.BadgeUncheckedCreateInput) {
    try {
      const newBadge = await prisma.badge.create({
        data,
      })

      return newBadge
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async listByCompanyId(companyId: string): Promise<Badge[]> {
    try {
      const badges = await prisma.badge.findMany({
        where: {
          companyId,
        },
        include: {
          earnedBy: {
            select: {
              id: true
            }
          }
        }
      })

      return badges
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findById(badgeId: string): Promise<Badge | null> {
    try {
      const badge = await prisma.badge.findUnique({
        where: {
          id: badgeId,
        },
      })

      return badge
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async update(badgeId: string, data: Prisma.BadgeUncheckedUpdateInput) {
    try {
      const updatedBadge = await prisma.badge.update({
        where: {
          id: badgeId,
        },
        data,
      })

      return updatedBadge
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete(badgeId: string) {
    try {
      const missionsWithBadge = await prisma.mission.findMany({
        where: {
          badges: {
            some: {
              id: badgeId
            }
          }
        }
      })
      const usersWithBadge = await prisma.user.findMany({
        where: {
          badges: {
            some: {
              id: badgeId
            }
          }
        }
      })

      const [, badge] = await prisma.$transaction([
        prisma.badge.update({
          where: {
            id: badgeId
          },
          data: {
            missions: {
              disconnect: missionsWithBadge.map(mission => ({ id: mission.id }))
            },
            earnedBy: {
              disconnect: usersWithBadge.map(user => ({ id: user.id }))
            }
          }
        }),
        prisma.badge.delete({
          where: {
            id: badgeId,
          },
        })
      ])
    } catch (error: any) {
      throw new Error(error)
    }
  }
}