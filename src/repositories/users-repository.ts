import { Badge, Mission, Prisma, Privilege, User } from '@prisma/client'

export type UserWithoutPassword = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl: string | null;
  xp: number;
  gold: number;
  role: string;
  completedMissionsIDs: string[];
  companyId: string;
  missionsIDs: string[];
  badgesIDs: string[];
}

export type UserWithAssociations = UserWithoutPassword & {
  badges: Badge[]
  missions: Mission[]
  privileges: Privilege[]
  completedMissions: Mission[]
}
export interface UsersRepository {
  findById(userId: string): Promise<UserWithAssociations | null>
  findByEmail(email: string): Promise<User | null>
  listByCompanyId(companyId: string): Promise<UserWithoutPassword[]>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  delete(userId: string): Promise<void>
  update(userId: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>
}
