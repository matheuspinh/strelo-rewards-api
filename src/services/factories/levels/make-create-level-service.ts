import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository"
import { PrismaLevelRepository } from "@/repositories/prisma/prisma-level-repository"
import { CreateLevelService } from "@/services/levels/create-levels"


export function makeCreateLevelService() {
  const levelsRepository = new PrismaLevelRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const service = new CreateLevelService(levelsRepository, companiesRepository)

  return service
}