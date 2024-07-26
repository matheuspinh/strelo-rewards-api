import { UsersRepository } from "@/repositories/users-repository"
import { ResourceNotFound } from "../errors/general-errors"

export class GetUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFound('Usuário não encontrado')
    }

    return user
  }
}