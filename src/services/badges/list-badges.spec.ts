import { FakeBadgesRepository } from "@/repositories/fakes/fake-badges-repository";
import { FakeCompanyRepository } from "@/repositories/fakes/fake-company-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListBadgesService } from "./list-badges";

let companiesRepository: FakeCompanyRepository
let badgesRepository: FakeBadgesRepository
let sut: ListBadgesService

describe("List Badges Service", () => {
  beforeEach(async () => {
    companiesRepository = new FakeCompanyRepository()
    badgesRepository = new FakeBadgesRepository()
    sut = new ListBadgesService(badgesRepository, companiesRepository)
  })

  it("should be able to list two badges from company 1", async () => {
    const company = await companiesRepository.create({ name: "Company", description: "Company description" })
    const company2 = await companiesRepository.create({ name: "Company2", description: "Company description" })

    await badgesRepository.create({ title: "Badge", description: "description mocked", companyId: company.id })
    await badgesRepository.create({ title: "Badge1", description: "description mocked", companyId: company.id })
    await badgesRepository.create({ title: "Badge2", description: "description mocked", companyId: company2.id })

    const badges = await sut.execute(company.id)

    expect(badges.badges).toHaveLength(2)
  })

  it("should be able to list one badge from company 2", async () => {
    const company = await companiesRepository.create({ name: "Company", description: "Company description" })
    const company2 = await companiesRepository.create({ name: "Company2", description: "Company description" })

    await badgesRepository.create({ title: "Badge", description: "description mocked", companyId: company.id })
    await badgesRepository.create({ title: "Badge1", description: "description mocked", companyId: company.id })
    await badgesRepository.create({ title: "Badge2", description: "description mocked", companyId: company2.id })

    const badges = await sut.execute(company2.id)

    expect(badges.badges).toHaveLength(1)
  })

  it("should throw an error if company does not exist", async () => {
    await expect(sut.execute("invalid-id")).rejects.toThrowError('Empresa não encontrada')
  })
})