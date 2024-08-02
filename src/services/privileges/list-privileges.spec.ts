import { FakeCompanyRepository } from "@/repositories/fakes/fake-company-repository";
import { FakePrivilegesRepository } from "@/repositories/fakes/fake-privileges-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListPrivilegesService } from "./list-privileges";

let companiesRepository: FakeCompanyRepository
let privilegesRepository: FakePrivilegesRepository
let sut: ListPrivilegesService

describe("List Privileges Service", () => {
  beforeEach(async () => {
    companiesRepository = new FakeCompanyRepository()
    privilegesRepository = new FakePrivilegesRepository()
    sut = new ListPrivilegesService(privilegesRepository, companiesRepository)
  })

  it("should be able to list two privileges from company 1", async () => {
    const company = await companiesRepository.create({ name: "Company", description: "Company description" })
    const company2 = await companiesRepository.create({ name: "Company2", description: "Company description" })

    await privilegesRepository.create({
      title: "Privilege",
      companyId: company.id,
      description: "Privilege description",
    })
    await privilegesRepository.create({
      title: "Privilege",
      companyId: company.id,
      description: "Privilege description",
    })
    await privilegesRepository.create({
      title: "Privilege",
      companyId: company2.id,
      description: "Privilege description",
    })

    const privileges = await sut.execute(company.id)

    expect(privileges.privileges).toHaveLength(2)
  })

  it("should be able to list one privilege from company 2", async () => {
    const company = await companiesRepository.create({ name: "Company", description: "Company description" })
    const company2 = await companiesRepository.create({ name: "Company2", description: "Company description" })

    await privilegesRepository.create({
      title: "Privilege",
      companyId: company.id,
      description: "Privilege description",
    })
    await privilegesRepository.create({
      title: "Privilege",
      companyId: company.id,
      description: "Privilege description",
    })
    await privilegesRepository.create({
      title: "Privilege",
      companyId: company2.id,
      description: "Privilege description",
    })

    const privileges = await sut.execute(company2.id)

    expect(privileges.privileges).toHaveLength(1)
  })
  it("should throw an error if company does not exist", async () => {
    await expect(sut.execute("invalid_id")).rejects.toThrow('Empresa não encontrada')
  })
})