import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-company-repository";
import { PrismaPrivilegesRepository } from "@/repositories/prisma/prisma-privileges-repository";
import { CreatePrivilegeService } from "@/services/privileges/create-privilege";


export function makeCreatePrivilegeService() {
  const privilegesRepository = new PrismaPrivilegesRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const service = new CreatePrivilegeService(privilegesRepository, companiesRepository)

  return service
}