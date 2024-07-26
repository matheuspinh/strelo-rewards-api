import { Prisma, Mission } from '@prisma/client'

export interface MissionsRepository {
  create(data: Prisma.MissionUncheckedCreateInput): Promise<Mission>
  listByCompany(companyId: string): Promise<Mission[]>
  delete(missionId: string): Promise<void>
}