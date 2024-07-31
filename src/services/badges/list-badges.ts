import { BadgesRepository } from "@/repositories/badges-repository";
import { CompanyRepository } from "@/repositories/company-repository";
import { DatabaseError } from "../errors/general-errors";

export class ListBadgesService {
  constructor(private badgesRepository: BadgesRepository, private companiesRepository: CompanyRepository) { }

  async execute(companyId: string) {
    try {
      const company = await this.companiesRepository.findById(companyId)

      if (!company) {
        throw new Error('Empresa não encontrada')
      }

      const badges = await this.badgesRepository.listByCompanyId(companyId)
      const badgesCount = badges.length

      return { badges, badgesCount }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new DatabaseError('Erro ao listar conquistas')
    }
  }
}