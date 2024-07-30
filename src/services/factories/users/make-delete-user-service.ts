import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { DeleteUserService } from "@/services/users/delete-user"

export const makeDeleteUserService = () => {
  const usersRepository = new PrismaUsersRepository()
  const service = new DeleteUserService(usersRepository)

  return service
}