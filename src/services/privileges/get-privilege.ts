import { PrivilegesRepository } from "@/repositories/privileges-repository"
import { DatabaseError, ResourceNotFound } from "../errors/general-errors"

export class GetPrivilegeService {
  constructor(private privilegesRepository: PrivilegesRepository) { }

  async execute(privilegeId: string) {
    try {
      const privilege = await this.privilegesRepository.findById(privilegeId)
      if (!privilege) {
        throw new ResourceNotFound('Privilégio não encontrado')
      }
      return privilege
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new DatabaseError('Erro ao buscar privilégio')
    }
  }
}