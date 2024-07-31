import { PrismaBadgesRepository } from "@/repositories/prisma/prisma-badges-repository";
import { UpdateBadgeService } from "@/services/badges/update-badge";

export function makeUpdateBadgeService() {
  const badgesRepository = new PrismaBadgesRepository()
  const service = new UpdateBadgeService(badgesRepository)

  return service
}