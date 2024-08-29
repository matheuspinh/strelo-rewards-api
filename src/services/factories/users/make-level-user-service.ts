import { PrismaLevelRepository } from "@/repositories/prisma/prisma-level-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { LevelUserService } from "@/services/users/level-user"

export function makeLevelUserService() {
  const usersRepository = new PrismaUsersRepository()
  const levelRepository = new PrismaLevelRepository()
  const service = new LevelUserService(usersRepository, levelRepository)

  return service
}