import { FakeUsersRepository } from "@/repositories/fakes/fake-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "./register";
import { UpdateUserService } from "./update-user";

let usersRepository: FakeUsersRepository
let registerService: RegisterService
let sut: UpdateUserService

describe("Update User Service", () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository()
    registerService = new RegisterService(usersRepository)
    sut = new UpdateUserService(usersRepository)

    await registerService.execute({
      email: "any_email",
      username: "any_username",
      password: "any_password",
      companyId: "any_company_id",
    })
  })

  it("should update a user", async () => {
    const { user } = await registerService.execute({
      email: "old_email",
      username: "old_username",
      password: "old_password",
      companyId: "company_id",
    })

    const updatedUser = await sut.execute(user.id, {
      email: "new_email",
      username: "new_username",
    })
    expect(updatedUser.email).toBe("new_email")
    expect(updatedUser.username).toBe("new_username")
  })

  it("should throw if user does not exist", async () => {
    await expect(sut.execute("any_id", {
      email: "new_email",
      username: "new_username",
    })).rejects.toThrow("Usuário não encontrado")
  })

  it("should throw if email is already in use", async () => {
    const { user } = await registerService.execute({
      email: "new_email",
      username: "new_username",
      password: "new_password",
      companyId: "new_company_id",
    })

    await expect(sut.execute(
      user.id, {
      email: "any_email",
      username: "new_username",
    })).rejects.toThrow("E-mail já cadastrado")
  })
})