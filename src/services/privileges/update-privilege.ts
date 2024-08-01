import { PrivilegesRepository } from "@/repositories/privileges-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";

export interface UpdatePrivilegeServiceRequest {
  title?: string
  description?: string
  companyId?: string
  gold?: number
  xp?: number
  usersIDs?: string[]
  requiredBadgeID?: string
}

export class UpdatePrivilegeService {
  constructor(private privilegesRepository: PrivilegesRepository) { }

  async execute(privilegeId: string, data: UpdatePrivilegeServiceRequest) {
    try {
      const privilege = await this.privilegesRepository.findById(privilegeId)

      if (!privilege) {
        throw new ResourceNotFound('Privilégio não encontrado')
      }

      const updatedPrivilege = await this.privilegesRepository.update(privilegeId, {
        title: data.title || privilege.title,
        description: data.description || privilege.description,
        companyId: data.companyId || privilege.companyId,
        gold: data.gold || privilege.gold,
        xp: data.xp || privilege.xp,
        usersIDs: data.usersIDs || privilege.usersIDs,
        requiredBadgeID: data.requiredBadgeID || privilege.requiredBadgeID,
      })

      return updatedPrivilege
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new DatabaseError('Error ao atualizar privilégio')
    }
  }
}