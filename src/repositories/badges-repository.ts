import { Badge, Prisma } from "@prisma/client";


export interface BadgesRepository {
  create(data: Prisma.BadgeUncheckedCreateInput): Promise<Badge>
  listByCompanyId(companyId: string): Promise<Badge[]>
  findById(badgeId: string): Promise<Badge | null>
  update(badgeId: string, data: Prisma.BadgeUncheckedUpdateInput): Promise<Badge>
  delete(badgeId: string): Promise<void>
}