import { FakeMissionsRepository } from "@/repositories/fakes/fake-missions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateBadgeService } from "./update-badge";
import { FakeBadgesRepository } from "@/repositories/fakes/fake-badges-repository";

let badgesRepository: FakeBadgesRepository
let sut: UpdateBadgeService

describe("Update Badge Service", () => {
  beforeEach(async () => {
    badgesRepository = new FakeBadgesRepository()
    sut = new UpdateBadgeService(badgesRepository)
  })

  it("should update a badge", async () => {
    const badge = await badgesRepository.create({
      companyId: 'any_company_id',
      title: 'any_title',
      description: 'any_description',
    })

    const updatedBadge = await sut.execute(badge.id, {
      title: 'new_title',
      description: 'new_description',
    })

    expect(updatedBadge.title).toBe('new_title')
    expect(updatedBadge.description).toBe('new_description')
  })

  it("should throw if badge does not exist", async () => {
    await expect(sut.execute('any_id', {
      title: 'new_title',
      description: 'new_description',
    })).rejects.toThrow('Insígnia não encontrada')
  })
})