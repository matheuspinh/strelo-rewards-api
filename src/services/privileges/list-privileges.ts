import { PrivilegesRepository } from "@/repositories/privileges-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";
import { CompanyRepository } from "@/repositories/company-repository";

export class ListPrivilegesService {
  constructor(private privilegesRepository: PrivilegesRepository, private companiesRepository: CompanyRepository) { }

  async execute(companyId: string) {
    try {
      const company = await this.companiesRepository.findById(companyId)
      if (!company) {
        throw new ResourceNotFound('Empresa não encontrada')
      }

      const privileges = await this.privilegesRepository.listByCompanyId(companyId)
      const privilegesCount = privileges.length

      return { privileges, privilegesCount }
    } catch (error) {
      console.log(error)
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new DatabaseError('Erro ao listar privilégios')
    }
  }
}