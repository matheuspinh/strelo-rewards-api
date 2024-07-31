import { PrismaBadgesRepository } from "@/repositories/prisma/prisma-badges-repository"
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository"
import { CreateBadgeService } from "@/services/badges/create-badge"

export function makeCreateBadgeService() {
  const badgesRepository = new PrismaBadgesRepository()
  const companyRepository = new PrismaCompaniesRepository()
  const service = new CreateBadgeService(badgesRepository, companyRepository)

  return service
}