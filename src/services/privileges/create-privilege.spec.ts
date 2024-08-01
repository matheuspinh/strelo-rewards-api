import { beforeEach, describe, expect, it } from "vitest";
import { CreatePrivilegeService } from "./create-privilege";
import { FakePrivilegesRepository } from "@/repositories/fakes/fake-privileges-repository";
import { FakeCompanyRepository } from "@/repositories/fakes/fake-company-repository";

let sut: CreatePrivilegeService;
let privilegesRepository: FakePrivilegesRepository;
let companiesRepository: FakeCompanyRepository;

describe("Create Privilege Service", () => {
  beforeEach(async () => {
    companiesRepository = new FakeCompanyRepository()
    privilegesRepository = new FakePrivilegesRepository()
    sut = new CreatePrivilegeService(privilegesRepository, companiesRepository)
  })

  it("should create a privilege", async () => {
    const company = await companiesRepository.create({
      name: "Company",
      description: "Company description"
    })
    const privilege = await sut.execute({
      title: "Privilege",
      description: "Privilege description",
      xp: 100,
      gold: 100,
      companyId: company.id,
      requiredBadgeId: "required-badge-id",
      usersIDs: []
    })

    expect(privilege.title).toBe("Privilege")
    expect(privilege.description).toBe("Privilege description")
    expect(privilege.xp).toBe(100)
    expect(privilege.gold).toBe(100)
    expect(privilege.companyId).toBe(company.id)
  })

  it("should throw an error if company does not exist", async () => {
    await expect(sut.execute({
      title: "Privilege",
      description: "Privilege description",
      xp: 100,
      gold: 100,
      companyId: "invalid-company-id",
      requiredBadgeId: "required-badge-id",
      usersIDs: []
    })).rejects.toThrow("Empresa não encontrada")
  })
})