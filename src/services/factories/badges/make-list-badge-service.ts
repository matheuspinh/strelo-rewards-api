import { PrismaBadgesRepository } from "@/repositories/prisma/prisma-badges-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository";
import { ListBadgesService } from "@/services/badges/list-badges";

export function makeListBadgeService() {
  const badgesRepository = new PrismaBadgesRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const service = new ListBadgesService(badgesRepository, companiesRepository)

  return service
}