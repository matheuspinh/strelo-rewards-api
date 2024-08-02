import { Prisma, Mission, Badge, User } from '@prisma/client'

export type UserInMission = Pick<User, 'avatarUrl' | 'id' | 'email' | 'username'>
export type BadgeInMission = Pick<Badge, 'description' | 'id' | 'imageUrl' | 'title'>
export interface MissionWithRelations extends Mission {
  badges: BadgeInMission[]
  users: UserInMission[]
  completedBy: UserInMission[]
}

export interface MissionsRepository {
  create(data: Prisma.MissionUncheckedCreateInput): Promise<Mission>
  listByCompany(companyId: string): Promise<MissionWithRelations[]>
  delete(missionId: string): Promise<void>
  findById(missionId: string): Promise<MissionWithRelations | null>
  update(missionId: string, data: Prisma.MissionUncheckedUpdateInput): Promise<Mission>
  missionCompletion(missionId: string, data: string[]): Promise<void>
}