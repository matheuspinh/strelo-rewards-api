import { UsersRepository } from "@/repositories/users-repository"
import { UserUnauthorizedError } from "../errors/user-errors"
import { ResourceNotFound } from "../errors/general-errors"

export interface ListUsersData {
  companyId: string,
  userId: string
}

export class ListUsersService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(data: ListUsersData) {
    const user = await this.usersRepository.findById(data.userId)
    if (!user) {
      throw new ResourceNotFound('Usuário não encontrado')
    }

    if (user.role !== 'admin') {
      throw new UserUnauthorizedError()
    }

    const users = await (await this.usersRepository.listByCompanyId(data.companyId)).filter((user) => user.id !== data.userId)
    const userCount = users.length

    return { users, userCount }
  }
}