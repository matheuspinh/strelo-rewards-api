import { UsersRepository } from "@/repositories/users-repository"
import { UserUnauthorizedError } from "../errors/user-errors"
import { ResourceNotFound } from "../errors/general-errors"

export class ListUsersService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
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
  }
}