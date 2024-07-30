import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository"
import { PrismaMissionsRepository } from "@/repositories/prisma/prisma-missions-repository"
import { ListMissionsService } from "@/services/missions/list-missions"

export function makeListMissionService() {
  const missionsRepository = new PrismaMissionsRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const service = new ListMissionsService(missionsRepository, companiesRepository)

  return service
}