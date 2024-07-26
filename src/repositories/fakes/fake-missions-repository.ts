import { Mission, Prisma } from "@prisma/client";
import { MissionsRepository } from "../missions-repository";
import { randomUUID } from "crypto";

export class FakeMissionsRepository implements MissionsRepository {
  public items: Mission[] = []

  async create(data: Prisma.MissionUncheckedCreateInput): Promise<Mission> {
    const mission = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || '',
      xp: data.xp,
      gold: data.gold,
      completedByIDs: [],
      usersIDs: [],
      companyId: data.companyId,
      badgesIDs: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.items.push(mission)
    return mission
  }

  async listByCompany(companyId: string): Promise<Mission[]> {
    return this.items.filter(mission => mission.companyId === companyId)
  }

  async delete(missionId: string): Promise<void> {
    const missionIndex = this.items.findIndex((item) => item.id === missionId)

    if (missionIndex === -1) {
      throw new Error('Mission not found')
    }

    this.items.splice(missionIndex, 1)

    return Promise.resolve()
  }
}