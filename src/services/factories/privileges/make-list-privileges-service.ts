import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository";
import { PrismaPrivilegesRepository } from "@/repositories/prisma/prisma-privileges-repository";
import { ListPrivilegesService } from "@/services/privileges/list-privileges";

export function makeListPrivilegesService() {
  const privilegesRepository = new PrismaPrivilegesRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const service = new ListPrivilegesService(privilegesRepository, companiesRepository)

  return service
}