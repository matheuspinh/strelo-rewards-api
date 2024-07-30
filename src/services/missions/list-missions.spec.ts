import { FakeMissionsRepository } from "@/repositories/fakes/fake-missions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMissionService } from "./create-mission";
import { ListMissionsService } from "./list-missions";
import { FakeCompanyRepository } from "@/repositories/fakes/fake-company-repository";
import { CreateCompanyService } from "../company/create-company";

let missionsRepository: FakeMissionsRepository
let companiesRepository: FakeCompanyRepository
let createMissionService: CreateMissionService
let createCompanyService: CreateCompanyService
let sut: ListMissionsService

describe("List Missions Service", () => {
  beforeEach(async () => {
    missionsRepository = new FakeMissionsRepository()
    companiesRepository = new FakeCompanyRepository()
    createCompanyService = new CreateCompanyService(companiesRepository)
    createMissionService = new CreateMissionService(missionsRepository, companiesRepository)
    sut = new ListMissionsService(missionsRepository, companiesRepository)
  })

  it("should be able to list two missions from company 1", async () => {
    const company = await createCompanyService.execute({ name: "Company", description: "Company description" })
    const company2 = await createCompanyService.execute({ name: "Company2", description: "Company description" })

    await createMissionService.execute({
      title: "Mission",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: company.id,
      badgesIDs: [],
      usersIDs: []
    })
    await createMissionService.execute({
      title: "Mission1",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: company.id,
      badgesIDs: [],
      usersIDs: []
    })
    await createMissionService.execute({
      title: "Mission2",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: company2.id,
      badgesIDs: [],
      usersIDs: []
    })

    const missions = await sut.execute(company.id)

    expect(missions.missions).toHaveLength(2)
  })

  it("should be able to list one mission from company 2", async () => {
    const company = await createCompanyService.execute({ name: "Company", description: "Company description" })
    const company2 = await createCompanyService.execute({ name: "Company2", description: "Company description" })

    await createMissionService.execute({
      title: "Mission",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: company.id,
      badgesIDs: [],
      usersIDs: []
    })
    await createMissionService.execute({
      title: "Mission1",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: company.id,
      badgesIDs: [],
      usersIDs: []
    })
    await createMissionService.execute({
      title: "Mission2",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: company2.id,
      badgesIDs: [],
      usersIDs: []
    })

    const missions = await sut.execute(company2.id)

    expect(missions.missions).toHaveLength(1)
  })

  it("should throw an error if company does not exist", async () => {
    await expect(sut.execute("invalid-company-id")).rejects.toThrow("Empresa não encontrada")
  })

})