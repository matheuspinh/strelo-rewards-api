import { beforeEach, describe, expect, it } from "vitest";
import { CreateMissionService } from "./create-mission";
import { FakeMissionsRepository } from "@/repositories/fakes/fake-missions-repository";
import { FakeCompanyRepository } from "@/repositories/fakes/fake-company-repository";
import { CreateCompanyService } from "../company/create-company";

let sut: CreateMissionService;
let createCompanyService: CreateCompanyService;
let missionsRepository: FakeMissionsRepository;
let companiesRepository: FakeCompanyRepository;

describe("Create Mission Service", () => {
  beforeEach(async () => {
    missionsRepository = new FakeMissionsRepository();
    companiesRepository = new FakeCompanyRepository();
    sut = new CreateMissionService(missionsRepository, companiesRepository);
    createCompanyService = new CreateCompanyService(companiesRepository);
  })

  it("should create a mission", async () => {
    const company = await createCompanyService.execute({ name: "Company", description: "Company description" });

    const mission = await sut.execute({
      title: "Mission",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: company.id,
      badgesIDs: [],
      usersIDs: []
    });

    expect(mission.title).toBe("Mission");
    expect(mission.description).toBe("Mission description");
    expect(mission.xp).toBe(100);
    expect(mission.gold).toBe(100);
    expect(mission.companyId).toBe(company.id);
  })

  it("should throw an error if company does not exist", async () => {
    await expect(sut.execute({
      title: "Mission",
      description: "Mission description",
      xp: 100,
      gold: 100,
      companyId: "invalid-company-id",
      badgesIDs: [],
      usersIDs: []
    })).rejects.toThrow("Company not found");
  })
})