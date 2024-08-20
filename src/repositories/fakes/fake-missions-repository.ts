import { Mission, missionStatus, Prisma, User } from "@prisma/client";
import { MissionsRepository, MissionWithRelations } from "../missions-repository";
import { randomUUID } from "crypto";

export class FakeMissionsRepository implements MissionsRepository {
  public items: Mission[] = []
  public users: User[] = []

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
      missions: [],
      badges: [],
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: missionStatus.ongoing
    }

    this.items.push(mission)
    return mission
  }

  async listByCompany(companyId: string) {
    return this.items.filter(mission => mission.companyId === companyId) as MissionWithRelations[]
  }

  async delete(missionId: string): Promise<void> {
    const missionIndex = this.items.findIndex((item) => item.id === missionId)

    if (missionIndex === -1) {
      throw new Error('Mission not found')
    }

    this.items.splice(missionIndex, 1)

    return Promise.resolve()
  }

  async findById(missionId: string) {
    const mission = this.items.find((item) => item.id === missionId)

    if (!mission) {
      return null
    }

    return mission as MissionWithRelations
  }

  async update(missionId: string, data: Prisma.MissionUncheckedUpdateInput): Promise<Mission> {
    const missionIndex = this.items.findIndex((item) => item.id === missionId)

    if (missionIndex === -1) {
      throw new Error('Mission not found')
    }

    const mission = this.items[missionIndex]

    Object.assign(mission, data)

    this.items[missionIndex] = mission

    return Promise.resolve(this.items[missionIndex])
  }

  async missionCompletion(missionId: string, data: string[]): Promise<void> {
    const missionIndex = this.items.findIndex((item) => item.id === missionId)

    if (missionIndex === -1) {
      throw new Error('Mission not found')
    }

    const mission = this.items[missionIndex]

    const usersId = data

    const currentCompletedByIds = mission.completedByIDs

    mission.completedByIDs.push(...currentCompletedByIds)

    this.items[missionIndex] = mission

    return Promise.resolve()
  }
}