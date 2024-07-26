import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UpdateUserService } from "@/services/users/update-user"

export const makeUpdateUserService = () => {
  const usersRepository = new PrismaUsersRepository()
  const service = new UpdateUserService(usersRepository)

  return service
}