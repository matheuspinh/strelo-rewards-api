import { Badge, Prisma } from "@prisma/client";
import { BadgesRepository } from "../badges-repository";

export class FakeBadgesRepository implements BadgesRepository {
  public items: Badge[] = []

  async create(data: Prisma.BadgeUncheckedCreateInput) {
    const badge = {
      id: Math.random().toString(),
      companyId: data.companyId,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || '',
      classification: data.classification,
      skillType: data.skillType,
      missionsIDs: data.missionsIDs || [],
    } as Badge

    this.items.push(badge)

    return badge
  }

  async listByCompanyId(companyId: string) {
    return this.items.filter(badge => badge.companyId === companyId)
  }

  async findById(badgeId: string) {
    return this.items.find(badge => badge.id === badgeId) || null
  }

  async update(badgeId: string, data: Prisma.BadgeUncheckedUpdateInput) {
    const badgeIndex = this.items.findIndex(badge => badge.id === badgeId)

    if (badgeIndex === -1) {
      throw new Error('Badge not found')
    }

    const badge = this.items[badgeIndex]

    Object.assign(badge, data)

    this.items[badgeIndex] = badge

    return Promise.resolve(this.items[badgeIndex])
  }

  async delete(badgeId: string) {
    const badgeIndex = this.items.findIndex(badge => badge.id === badgeId)

    if (badgeIndex === -1) {
      throw new Error('Badge not found')
    }

    this.items.splice(badgeIndex, 1)

    return Promise.resolve()
  }

}