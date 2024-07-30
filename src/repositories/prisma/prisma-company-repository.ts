import { prisma } from '@/lib/prisma'
import { Company, Prisma } from '@prisma/client'
import { CompanyRepository } from '../company-repository'

export class PrismaCompaniesRepository implements CompanyRepository {
  async findById(userId: string) {
    const user = await prisma.company.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }

  async create(data: Prisma.CompanyCreateInput) {
    const company = await prisma.company.create({
      data,
    })

    return company
  }
}