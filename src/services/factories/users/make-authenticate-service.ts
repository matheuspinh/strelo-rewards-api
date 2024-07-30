import { AuthenticateService } from '@/services/users/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new AuthenticateService(usersRepository)

  return service
}
