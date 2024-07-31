import { PrismaPrivilegesRepository } from "@/repositories/prisma/prisma-privileges-repository";
import { UpdatePrivilegeService } from "@/services/privileges/update-privilege";

export function makeUpdatePrivilegeService() {
  const privilegesRepository = new PrismaPrivilegesRepository()

  const service = new UpdatePrivilegeService(privilegesRepository)

  return service
}