import { FakePrivilegesRepository } from "@/repositories/fakes/fake-privileges-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdatePrivilegeService } from "./update-privilege";

let privilegesRepository: FakePrivilegesRepository
let sut: UpdatePrivilegeService

describe("Update Privilege Service", () => {
  beforeEach(async () => {
    privilegesRepository = new FakePrivilegesRepository()
    sut = new UpdatePrivilegeService(privilegesRepository)
  })

  it("should update a privilege", async () => {
    const privilege = await privilegesRepository.create({
      title: "any_title",
      description: "any_description",
      xp: 10,
      gold: 10,
      companyId: "any_company_id",
    })

    const updatedPrivilege = await sut.execute(privilege.id, {
      title: "new_title",
      description: "new_description",
      xp: 20,
      gold: 20,
    })

    expect(updatedPrivilege.title).toBe("new_title")
    expect(updatedPrivilege.description).toBe("new_description")
    expect(updatedPrivilege.xp).toBe(20)
    expect(updatedPrivilege.gold).toBe(20)
  })

  it("should throw if privilege does not exist", async () => {
    await expect(sut.execute("any_id", {
      title: "new_title",
      description: "new_description",
      xp: 20,
      gold: 20,
    })).rejects.toThrow("Privilégio não encontrado")
  })
})