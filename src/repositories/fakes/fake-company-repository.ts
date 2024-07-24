import { Company, Prisma } from "@prisma/client";
import { CompanyRepository } from "../company-repository";

export class FakeCompanyRepository implements CompanyRepository {
  public items: Company[] = []

  async findById(companyId: string) {
    const company = this.items.find((item) => item.id === companyId)

    if (!company) {
      return null
    }

    return company
  }

  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = {
      id: '1',
      name: data.name,
      description: data.description,
      logoUrl: data.logoUrl || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(company)

    return company
  }
}