import { LevelRepository } from "@/repositories/level-repository"
import { DatabaseError, ResourceNotFound } from "../errors/general-errors"

export class GetLevelService {
  constructor(private levelsRepository: LevelRepository) { }

  async execute(levelId: string) {
    try {
      const level = await this.levelsRepository.findById(levelId)
      if (!level) {
        throw new ResourceNotFound('Nível não encontrado')
      }
      return level
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new DatabaseError('Erro ao buscar nível')
    }
  }
}