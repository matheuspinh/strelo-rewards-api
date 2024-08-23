import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository"
import { PrismaLevelRepository } from "@/repositories/prisma/prisma-level-repository"
import { ListLevelsService } from "@/services/levels/list-levels"


export function makeListLevelService() {
  const levelsRepository = new PrismaLevelRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const service = new ListLevelsService(levelsRepository, companiesRepository)

  return service
}