import { FakeMissionsRepository } from "@/repositories/fakes/fake-missions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetMissionService } from "./get-mission";

let missionsRepository: FakeMissionsRepository
let sut: GetMissionService

describe('Get Mission Service', () => {
  beforeEach(async () => {
    missionsRepository = new FakeMissionsRepository()
    sut = new GetMissionService(missionsRepository)
  })

  it('should return a mission', async () => {
    const mission = await missionsRepository.create({
      title: 'any_title',
      description: 'any_description',
      xp: 10,
      gold: 10,
      companyId: 'any_company_id'
    })

    const foundMission = await sut.execute(mission.id)
    expect(foundMission.title).toEqual('any_title')
  })

  it('should not be able to get a mission with wrong id', async () => {
    await expect(() => sut.execute('wrong-id')).rejects.toThrowError('Missão não encontrada')
  })
})
