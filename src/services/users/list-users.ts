import { UsersRepository } from "@/repositories/users-repository"
import { UserUnauthorizedError } from "../errors/user-errors"
import { DatabaseError, ResourceNotFound } from "../errors/general-errors"

export class ListUsersService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
    try {
      const user = await this.usersRepository.findById(id)
      if (!user) {
        throw new ResourceNotFound('Usuário não encontrado')
      }

      if (user.role !== 'admin') {
        throw new UserUnauthorizedError()
      }

      const users = await (await this.usersRepository.listByCompanyId(user.companyId)).filter((item) => item.id !== id)
      const userCount = users.length

      return { users, userCount }
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      if (error instanceof UserUnauthorizedError) {
        throw error
      }
      throw new DatabaseError('Erro ao listar usuários')
    }
  }
}