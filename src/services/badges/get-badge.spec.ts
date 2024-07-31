import { FakeBadgesRepository } from "@/repositories/fakes/fake-badges-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetBadgeService } from "./get-badge";

let badgesRepository: FakeBadgesRepository
let sut: GetBadgeService

describe('Get Badge Service', () => {
  beforeEach(async () => {
    badgesRepository = new FakeBadgesRepository()
    sut = new GetBadgeService(badgesRepository)
  })

  it('should return a badge', async () => {
    const badge = await badgesRepository.create({
      title: 'any_title',
      description: 'any_description',
      companyId: 'any_company_id'
    })

    const foundBadge = await sut.execute(badge.id)
    expect(foundBadge.title).toEqual('any_title')
  })

  it('should not be able to get a badge with wrong id', async () => {
    await expect(() => sut.execute('wrong-id')).rejects.toThrowError('Insígnia não encontrada')
  })
})