import { MissionsRepository } from "@/repositories/missions-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";
import { CompanyRepository } from "@/repositories/company-repository";



export class ListMissionsService {
  constructor(private missionsRepository: MissionsRepository, private companiesRepository: CompanyRepository) { }

  async execute(id: string) {
    try {
      const company = await this.companiesRepository.findById(id)
      if (!company) {
        throw new ResourceNotFound('Empresa não encontrada')
      }

      const missions = await this.missionsRepository.listByCompany(id)
      const missionCount = missions.length

      return { missions, missionCount }
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new DatabaseError('Erro ao listar missões')
    }

  }
}