import { MissionsRepository } from "@/repositories/missions-repository";


export class CompleteMissionService {
  constructor(private missionsRepository: MissionsRepository) { }

  async execute(missionId: string, userId: string[]) {
    try {
      const mission = await this.missionsRepository.missionCompletion(missionId, userId)
      return
    } catch (error) {
      throw new Error('Error completing mission')
    }
  }
}