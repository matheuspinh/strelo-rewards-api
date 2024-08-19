import { FakeBadgesRepository } from "@/repositories/fakes/fake-badges-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateBadgeService } from "./create-badge";
import { FakeCompanyRepository } from "@/repositories/fakes/fake-company-repository";

let badgesRepository: FakeBadgesRepository
let companiesRepository: FakeCompanyRepository
let sut: CreateBadgeService

describe("Create Badge Service", () => {
  beforeEach(() => {
    companiesRepository = new FakeCompanyRepository()
    badgesRepository = new FakeBadgesRepository()
    sut = new CreateBadgeService(badgesRepository, companiesRepository)
  })

  it("should be able to create a badge", async () => {
    const company = await companiesRepository.create({
      name: "Company",
      description: "Company description"
    })

    const badge = await sut.execute({
      companyId: company.id,
      title: "Badge Title",
      description: "Badge Description",
      image: null,
      classification: 'bronze',
      skillType: 'hardskill'
    })

    expect(badge.title).toEqual('Badge Title')
  })

  it("should throw an error if company does not exist", async () => {
    await expect(sut.execute({
      companyId: "invalid-company-id",
      title: "Badge Title",
      description: "Badge Description",
      image: null,
      classification: 'bronze',
      skillType: 'hardskill'
    })).rejects.toThrow('Empresa não encontrada')
  })
})