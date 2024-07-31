import { PrismaBadgesRepository } from "@/repositories/prisma/prisma-badges-repository";
import { GetBadgeService } from "@/services/badges/get-badge";

export function makeGetBadgeService() {
  const badgesRepository = new PrismaBadgesRepository()
  const service = new GetBadgeService(badgesRepository)

  return service
}