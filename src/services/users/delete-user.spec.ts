import { FakeUsersRepository } from "@/repositories/fakes/fake-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "./register";
import { DeleteUserService } from "./delete-user";

let usersRepository: FakeUsersRepository
let registerUserService: RegisterService
let sut: DeleteUserService

describe("Delete User Service", () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    registerUserService = new RegisterService(usersRepository)
    sut = new DeleteUserService(usersRepository)
  })

  it("should delete a user", async () => {
    const { user } = await registerUserService.execute({
      email: "any_email",
      username: "any_username",
      password: "any_password",
      companyId: "any_company_id"
    })

    await sut.execute(user.id)

    const userFound = await usersRepository.findById(user.id)

    expect(userFound).toBeNull()
  })

  it("should throw if user does not exist", async () => {
    await expect(sut.execute("any_id")).rejects.toThrow()
  })
})