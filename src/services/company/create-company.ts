import { CompanyRepository } from "@/repositories/company-repository";
import { DatabaseError } from "../errors/general-errors";

export interface CreateCompanyData {
  name: string
  description: string
}

export class CreateCompanyService {
  constructor(private companiesRepository: CompanyRepository) { }

  async execute(data: CreateCompanyData) {
    try {
      const company = await this.companiesRepository.create(data)
      return company
    } catch (error) {
      throw new DatabaseError()
    }
  }
}