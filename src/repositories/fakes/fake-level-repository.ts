import { Level, Prisma } from "@prisma/client";
import { LevelRepository, LevelWithRelations } from "../level-repository";
import { randomInt } from "crypto";
import { ResourceNotFound } from "@/services/errors/general-errors";

export class FakeLevelRepository implements LevelRepository {
  public items: Level[] = []

  async create(data: Prisma.LevelUncheckedCreateInput) {
    const level = {
      id: randomInt(1, 1000).toString(),
      title: data.title,
      xpRequired: data.xpRequired,
      goldReward: data.goldReward || 0,
      companyId: data.companyId,
      hardSkillsBadges: data.hardSkillsBadges,
      softSkillsBadges: data.softSkillsBadges,
      nextLevelId: data.nextLevelId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return level
  }

  async listByCompany(companyId: string) {
    const levels = this.items.filter(level => level.companyId === companyId)

    return levels
  }

  async delete(levelId: string): Promise<void> {
    const levelIndex = this.items.findIndex(level => level.id === levelId)

    if (levelIndex === -1) {
      throw new ResourceNotFound('Level not found')
    }

    this.items.splice(levelIndex, 1)

    return Promise.resolve()
  }

  async findById(levelId: string) {
    const level = this.items.find(level => level.id === levelId)

    return level as LevelWithRelations
  }

  async update(levelId: string, data: Prisma.LevelUncheckedUpdateInput) {
    const levelIndex = this.items.findIndex(level => level.id === levelId)

    if (levelIndex === -1) {
      throw new ResourceNotFound('Level not found')
    }

    const level = this.items[levelIndex]

    Object.assign(level, data)

    this.items[levelIndex] = level

    return Promise.resolve(this.items[levelIndex])
  }
}