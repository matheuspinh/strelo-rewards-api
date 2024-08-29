import { LevelRepository } from "@/repositories/level-repository";
import { Level } from "@prisma/client";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";

export interface UpdateLevelServiceRequest {
  title: string
  softSkillsBadges: number
  hardSkillsBadges: number
  xpRequired: number
  previousLevelId?: string | null
  goldSoftSkills?: number
  goldHardSkills?: number
  silverSoftSkills?: number
  silverHardSkills?: number
  specificBadgeId?: string | null
}

export class UpdateLevelService {
  constructor(private levelsRepository: LevelRepository) { }

  async execute(levelId: string, data: UpdateLevelServiceRequest) {
    try {
      const level = await this.levelsRepository.findById(levelId) as unknown as Level

      if (!level) {
        throw new ResourceNotFound('Nível não encontrado')
      }

      if (data.previousLevelId === '') {
        data.previousLevelId = null
      }
      if (data.specificBadgeId === '') {
        data.specificBadgeId = null
      }

      const updatedLevel = await this.levelsRepository.update(levelId, data)
      return updatedLevel
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      console.log(error)
      throw new DatabaseError('Erro ao atualizar o nível')
    }
  }
}