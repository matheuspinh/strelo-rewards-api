import { RegisterService } from '@/services/users/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new RegisterService(usersRepository)

  return service
}
