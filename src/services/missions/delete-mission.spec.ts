import { beforeEach, describe, expect, it } from "vitest";
import { CreateMissionService } from "./create-mission";
import { FakeMissionsRepository } from "@/repositories/fakes/fake-missions-repository";
import { DeleteMissionService } from "./delete-mission";
import { FakeCompanyRepository } from "@/repositories/fakes/fake-company-repository";
import { CreateCompanyService } from "../company/create-company";


let missionsRepository: FakeMissionsRepository
let companiesRepository: FakeCompanyRepository
let createCompanyService: CreateCompanyService
let createMissionService: CreateMissionService
let sut: DeleteMissionService


describe("Delete Mission Service", () => {
  beforeEach(() => {
    missionsRepository = new FakeMissionsRepository()
    companiesRepository = new FakeCompanyRepository()
    createCompanyService = new CreateCompanyService(companiesRepository)
    createMissionService = new CreateMissionService(missionsRepository, companiesRepository)
    sut = new DeleteMissionService(missionsRepository)
  })

  it("should delete a mission", async () => {
    const company = await createCompanyService.execute({
      name: "any_name",
      description: "any_description"
    })

    const mission = await createMissionService.execute({
      title: "any_title",
      description: "any_description",
      companyId: company.id,
      badgesIDs: [],
      gold: 0,
      usersIDs: [],
      xp: 0
    })

    await sut.execute(mission.id)

    const missionFound = await missionsRepository.findById(mission.id)

    expect(missionFound).toBeNull()
  })

  it("should throw if mission does not exist", async () => {
    await expect(sut.execute("any_id")).rejects.toThrow()
  })
})