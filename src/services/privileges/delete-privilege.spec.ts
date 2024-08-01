import { FakePrivilegesRepository } from "@/repositories/fakes/fake-privileges-repository";
import { DeletePrivilegeService } from "./delete-privilege";
import { beforeEach, describe, expect, it } from "vitest";

let privilegesRepository: FakePrivilegesRepository
let sut: DeletePrivilegeService

describe("Delete Privilege Service", () => {
  beforeEach(async () => {
    privilegesRepository = new FakePrivilegesRepository()
    sut = new DeletePrivilegeService(privilegesRepository)
  })

  it("should delete a privilege", async () => {
    const privilege = await privilegesRepository.create({
      title: "any_title",
      description: "any_description",
      xp: 10,
      gold: 10,
      companyId: "any_company_id",
    })

    await sut.execute(privilege.id)

    const privilegeFound = await privilegesRepository.findById(privilege.id)

    expect(privilegeFound).toBeNull()
  })

  it("should throw if privilege does not exist", async () => {
    await expect(sut.execute("any_id")).rejects.toThrow()
  })
})