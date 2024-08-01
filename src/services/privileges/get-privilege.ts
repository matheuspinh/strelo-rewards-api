import { PrivilegesRepository } from "@/repositories/privileges-repository"
import { ResourceNotFound } from "../errors/general-errors"

export class GetPrivilegeService {
  constructor(private privilegesRepository: PrivilegesRepository) { }

  async execute(privilegeId: string) {
    const privilege = await this.privilegesRepository.findById(privilegeId)
    if (!privilege) {
      throw new ResourceNotFound('Privilégio não encontrado')
    }

    return privilege
  }
}