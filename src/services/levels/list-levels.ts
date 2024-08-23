import { CompanyRepository } from "@/repositories/company-repository";
import { LevelRepository } from "@/repositories/level-repository";
import { ResourceNotFound } from "../errors/general-errors";

export class ListLevelsService {
  constructor(private levelsRepository: LevelRepository, private companyRepository: CompanyRepository) { }

  async execute(companyId: string) {
    try {
      const company = await this.companyRepository.findById(companyId)

      if (!company) {
        throw new ResourceNotFound('Company not found')
      }

      const levels = await this.levelsRepository.listByCompany(companyId)

      return levels
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new Error('Error listing levels')
    }
  }
}