import { Badge, Prisma } from "@prisma/client";
import { BadgesRepository } from "../badges-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBadgesRepository implements BadgesRepository {
  async create(data: Prisma.BadgeUncheckedCreateInput) {
    const newBadge = await prisma.badge.create({
      data,
    })

    return newBadge
  }

  async listByCompanyId(companyId: string): Promise<Badge[]> {
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
  }

  async findById(badgeId: string): Promise<Badge | null> {
    const badge = await prisma.badge.findUnique({
      where: {
        id: badgeId,
      },
    })

    return badge
  }

  async update(badgeId: string, data: Prisma.BadgeUncheckedUpdateInput) {
    const updatedBadge = await prisma.badge.update({
      where: {
        id: badgeId,
      },
      data,
    })

    return updatedBadge
  }

  async delete(badgeId: string) {
    await prisma.badge.delete({
      where: {
        id: badgeId,
      },
    })
  }
}