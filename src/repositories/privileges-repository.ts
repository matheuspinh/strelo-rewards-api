import { Prisma, Privilege } from "@prisma/client";

export interface PrivilegesRepository {
  create(data: Prisma.PrivilegeUncheckedCreateInput): Promise<Privilege>
  listByCompanyId(companyId: string): Promise<Privilege[]>
  findById(privilegeId: string): Promise<Privilege | null>
  update(privilegeId: string, data: Prisma.PrivilegeUncheckedUpdateInput): Promise<Privilege>
  delete(privilegeId: string): Promise<void>
}