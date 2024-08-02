import { PrismaMissionsRepository } from "@/repositories/prisma/prisma-missions-repository";
import { CompleteMissionService } from "@/services/missions/complete-mission";

export function makeCompleteMissionService() {
  const missionsRepository = new PrismaMissionsRepository()

  const service = new CompleteMissionService(missionsRepository)
  return service
}