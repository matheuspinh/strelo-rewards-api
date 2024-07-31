import { FakeBadgesRepository } from "@/repositories/fakes/fake-badges-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteBadgeService } from "./delete-badge";

let badgesRepository: FakeBadgesRepository
let sut: DeleteBadgeService

describe("Delete Badge Service", () => {
  beforeEach(() => {
    badgesRepository = new FakeBadgesRepository()
    sut = new DeleteBadgeService(badgesRepository)
  })

  it("should delete a badge", async () => {
    const badge = await badgesRepository.create({
      companyId: "any_company_id",
      title: "any_title",
      description: "any_description",
    })

    await sut.execute(badge.id)

    const badgeFound = await badgesRepository.findById(badge.id)

    expect(badgeFound).toBeNull()
  })

  it("should throw if badge does not exist", async () => {
    await expect(sut.execute("any_id")).rejects.toThrow()
  })
})