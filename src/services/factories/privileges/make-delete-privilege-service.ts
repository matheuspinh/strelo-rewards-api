import { PrismaPrivilegesRepository } from "@/repositories/prisma/prisma-privileges-repository";
import { DeletePrivilegeService } from "@/services/privileges/delete-privilege";

export function makeDeletePrivilegeService() {
  const privilegesRepository = new PrismaPrivilegesRepository()

  const service = new DeletePrivilegeService(privilegesRepository)

  return service
}