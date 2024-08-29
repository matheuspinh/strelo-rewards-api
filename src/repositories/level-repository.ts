import { Badge, Level, Prisma } from '@prisma/client'

export interface LevelWithRelations extends Level {
  users: {
    id: string
    username: string
    avatarUrl: string | null
  }[],
  nextLevel: {
    id: string
    title: string
  }[],
  previousLevel: {
    id: string
    title: string
  } | null,
  specificBadge: Badge | null
}

export interface LevelRepository {
  create(data: Prisma.LevelUncheckedCreateInput): Promise<Level>
  listByCompany(companyId: string): Promise<Level[]>
  delete(levelId: string): Promise<void>
  findById(levelId: string): Promise<LevelWithRelations | null>
  update(levelId: string, data: Prisma.LevelUncheckedUpdateInput): Promise<Level>
}