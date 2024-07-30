import { FakeMissionsRepository } from "@/repositories/fakes/fake-missions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateMissionService } from "./update-mission";

let missionsRepository: FakeMissionsRepository
let sut: UpdateMissionService

describe("Update Mission Service", () => {
  beforeEach(async () => {
    missionsRepository = new FakeMissionsRepository()
    sut = new UpdateMissionService(missionsRepository)
  })

  it("should update a mission", async () => {
    const mission = await missionsRepository.create({
      title: "any_title",
      description: "any_description",
      xp: 10,
      gold: 10,
      companyId: "any_company_id",
    })

    const updatedMission = await sut.execute(mission.id, {
      title: "new_title",
      description: "new_description",
      xp: 20,
      gold: 20,
    })

    expect(updatedMission.title).toBe("new_title")
    expect(updatedMission.description).toBe("new_description")
    expect(updatedMission.xp).toBe(20)
    expect(updatedMission.gold).toBe(20)
  })

  it("should throw if mission does not exist", async () => {
    await expect(sut.execute("any_id", {
      title: "new_title",
      description: "new_description",
      xp: 20,
      gold: 20,
    })).rejects.toThrow("Missão não encontrada")
  })
})