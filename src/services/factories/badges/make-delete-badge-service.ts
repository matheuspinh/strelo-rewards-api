import { PrismaBadgesRepository } from "@/repositories/prisma/prisma-badges-repository";
import { DeleteBadgeService } from "@/services/badges/delete-badge";

export function makeDeleteBadgeService() {
  const badgesRepository = new PrismaBadgesRepository()
  const service = new DeleteBadgeService(badgesRepository)

  return service
}