import { PrismaPrivilegesRepository } from "@/repositories/prisma/prisma-privileges-repository";
import { GetPrivilegeService } from "@/services/privileges/get-privilege";

export function makeGetPrivilegeService() {
  const privilegesRepository = new PrismaPrivilegesRepository()

  const service = new GetPrivilegeService(privilegesRepository)

  return service
}