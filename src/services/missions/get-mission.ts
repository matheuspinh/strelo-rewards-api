import { MissionsRepository } from "@/repositories/missions-repository";
import { DatabaseError, ResourceNotFound } from "../errors/general-errors";

export class GetMissionService {
  constructor(private missionsRepository: MissionsRepository) { }

  async execute(missionId: string) {
    try {
      const mission = await this.missionsRepository.findById(missionId)

      console.log(mission)
      if (!mission) {
        throw new ResourceNotFound('Missão não encontrada')
      }
      return mission
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw error
      }
      throw new DatabaseError('Erro ao buscar missão')
    }
  }
}