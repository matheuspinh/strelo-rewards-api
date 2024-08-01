import { MissionsRepository } from "@/repositories/missions-repository";
import { ResourceNotFound } from "../errors/general-errors";

export class GetMissionService {
  constructor(private missionsRepository: MissionsRepository) { }

  async execute(missionId: string) {
    const mission = await this.missionsRepository.findById(missionId)
    if (!mission) {
      throw new ResourceNotFound('Missão não encontrada')
    }

    return mission
  }
}