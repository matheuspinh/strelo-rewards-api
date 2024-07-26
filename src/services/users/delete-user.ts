import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFound } from "../errors/general-errors";

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(userId: string) {
    try {
      await this.usersRepository.delete(userId)
      return
    } catch (error) {
      throw new ResourceNotFound('Usuário não encontrado')
    }

  }
}