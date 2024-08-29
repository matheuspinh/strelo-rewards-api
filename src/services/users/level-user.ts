import { LevelRepository } from "@/repositories/level-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFound } from "../errors/general-errors";

export class LevelUserService {
  constructor(private usersRepository: UsersRepository, private levelRepository: LevelRepository) { }

  async execute(userId: string, levelId: string) {
    try {
      const level = await this.levelRepository.findById(levelId)

      if (!level) {
        throw new ResourceNotFound('Nível não encontrado')
      }

      const userExists = await this.usersRepository.findById(userId)

      if (!userExists) {
        throw new ResourceNotFound('Usuário não encontrado')
      }

      const leveledUser = await this.usersRepository.level(userId, levelId)

      return
    } catch (error: any) {
      throw new Error(error)
    }
  }
}