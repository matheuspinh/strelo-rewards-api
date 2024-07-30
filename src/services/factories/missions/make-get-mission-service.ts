import { PrismaMissionsRepository } from "@/repositories/prisma/prisma-missions-repository";
import { GetMissionService } from "@/services/missions/get-mission";

export function makeGetMissionService() {
  const missionsRepository = new PrismaMissionsRepository();
  const service = new GetMissionService(missionsRepository);

  return service;
}