import { PrismaLevelRepository } from "@/repositories/prisma/prisma-level-repository";
import { GetLevelService } from "@/services/levels/get-level";

export function makeGetLevelService() {
  const levelsRepository = new PrismaLevelRepository()

  const service = new GetLevelService(levelsRepository)

  return service
}