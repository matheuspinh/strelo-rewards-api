import { UsersRepository } from "@/repositories/users-repository"
import { DatabaseError, ResourceNotFound } from "../errors/general-errors"

export class GetUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(userId: string) {
    try {
      const user = await this.usersRepository.findById(userId)
      if (!user) {
        throw new ResourceNotFound('Usuário não encontrado')
      }

      return user
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new DatabaseError('Erro ao buscar usuário')
    }
  }
}