import { prisma } from '@/lib/prisma'
import { Company, Prisma } from '@prisma/client'
import { CompanyRepository } from '../company-repository'

export class PrismaCompaniesRepository implements CompanyRepository {
  async findById(userId: string) {
    try {
      const user = await prisma.company.findUnique({
        where: {
          id: userId,
        },
      })

      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async create(data: Prisma.CompanyCreateInput) {
    try {
      const company = await prisma.company.create({
        data,
      })

      return company
    } catch (error: any) {
      throw new Error(error)
    }
  }
}