import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserService } from "@/services/users/get-user";

export function makeGetUserService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new GetUserService(usersRepository)

  return service
}