import { PrismaMissionsRepository } from "@/repositories/prisma/prisma-missions-repository"
import { DeleteMissionService } from "@/services/missions/delete-mission"

export function makeDeleteMissionService() {
  const missionsRepository = new PrismaMissionsRepository()
  const service = new DeleteMissionService(missionsRepository)

  return service
} 