import { PrivilegesRepository } from "@/repositories/privileges-repository";
import { ResourceNotFound } from "../errors/general-errors";

export class DeletePrivilegeService {
  constructor(private privilegesRepository: PrivilegesRepository) { }

  async execute(id: string) {
    try {
      await this.privilegesRepository.delete(id)
      return
    } catch (error) {
      throw new ResourceNotFound('Erro ao deletar privilégio')
    }
  }
}