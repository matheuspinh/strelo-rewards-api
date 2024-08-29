import { PrismaLevelRepository } from "@/repositories/prisma/prisma-level-repository";
import { UpdateLevelService } from "@/services/levels/update-level";

export function makeUpdateLevelService() {
  const levelsRepository = new PrismaLevelRepository()

  const service = new UpdateLevelService(levelsRepository)

  return service
}