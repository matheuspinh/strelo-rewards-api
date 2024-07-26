import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository";
import { PrismaMissionsRepository } from "@/repositories/prisma/prisma-missions-repository";
import { CreateMissionService } from "@/services/missions/create-mission";

export function makeCreateMissionService() {
  const missionsRepository = new PrismaMissionsRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const service = new CreateMissionService(missionsRepository, companiesRepository)

  return service
}