import { CompanyRepository } from "@/repositories/company-repository";
import { LevelRepository } from "@/repositories/level-repository";
import { ResourceNotFound } from "../errors/general-errors";

export interface CreateLevelData {
  title: string
  xpRequired: number
  goldReward: number
  companyId: string
  hardSkillsBadges: number
  softSkillsBadges: number
  previousLevelId: string | undefined
}

export class CreateLevelService {
  constructor(private levelsRepository: LevelRepository, private companiesRepository: CompanyRepository) { }

  async execute(data: CreateLevelData) {
    try {
      const company = await this.companiesRepository.findById(data.companyId)
      console.log(data)
      if (!company) {
        throw new ResourceNotFound('Company not found')
      }

      const level = await this.levelsRepository.create({
        title: data.title,
        xpRequired: data.xpRequired,
        goldReward: data.goldReward,
        companyId: data.companyId,
        hardSkillsBadges: data.hardSkillsBadges,
        softSkillsBadges: data.softSkillsBadges,
        previousLevelId: data.previousLevelId
      })

      return level
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      console.log(error)
      throw new Error('Error creating level')
    }
  }
}