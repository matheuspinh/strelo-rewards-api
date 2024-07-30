import { PrismaMissionsRepository } from "@/repositories/prisma/prisma-missions-repository"
import { UpdateMissionService } from "@/services/missions/update-mission"

export function makeUpdateMissionService() {
  const missionsRepository = new PrismaMissionsRepository()
  const service = new UpdateMissionService(missionsRepository)

  return service
}