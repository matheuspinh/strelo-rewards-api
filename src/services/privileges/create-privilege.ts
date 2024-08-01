import { CompanyRepository } from "@/repositories/company-repository";
import { PrivilegesRepository } from "@/repositories/privileges-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";

export interface CreatePrivilegeData {
  title: string
  description: string
  companyId: string
  requiredBadgeId: string
  usersIDs: string[]
  xp: number
  gold: number
}

export class CreatePrivilegeService {
  constructor(private privilegesRepository: PrivilegesRepository, private companiesRepository: CompanyRepository) { }

  async execute(data: CreatePrivilegeData) {
    const company = await this.companiesRepository.findById(data.companyId)

    if (!company) {
      throw new ResourceNotFound('Empresa não encontrada')
    }

    try {
      const privilege = await this.privilegesRepository.create({
        title: data.title,
        description: data.description,
        xp: data.xp,
        gold: data.gold,
        companyId: data.companyId,
        requiredBadgeID: data.requiredBadgeId,
      })

      return privilege
    } catch (error) {
      throw new DatabaseError('Error creating privilege')
    }

  }
}