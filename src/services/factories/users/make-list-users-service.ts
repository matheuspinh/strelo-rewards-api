import { ListUsersService } from "@/services/users/list-users";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeListUsersService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new ListUsersService(usersRepository)

  return service
}