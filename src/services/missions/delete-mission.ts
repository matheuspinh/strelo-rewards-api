import { MissionsRepository } from "@/repositories/missions-repository"
import { ResourceNotFound } from "../errors/general-errors"

export class DeleteMissionService {
  constructor(private missionsRepository: MissionsRepository) { }

  async execute(id: string) {
    try {
      await this.missionsRepository.delete(id)
      return
    } catch (error) {
      throw new ResourceNotFound('Erro ao deletar missão')
    }
  }
}