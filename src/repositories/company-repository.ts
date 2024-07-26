import { Prisma, Company } from '@prisma/client'

export interface CompanyRepository {
  findById(userId: string): Promise<Company | null>
  create(data: Prisma.CompanyUncheckedCreateInput): Promise<Company>
}
