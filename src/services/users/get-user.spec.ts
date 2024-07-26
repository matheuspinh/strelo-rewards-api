import { FakeUsersRepository } from "@/repositories/fakes/fake-users-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { ResourceNotFound } from "../errors/general-errors";
import { GetUserService } from "./get-user";
import { RegisterService } from "./register";

let usersRepository: FakeUsersRepository
let registerService: RegisterService
let sut: GetUserService

describe('Get User Service', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository()
    registerService = new RegisterService(usersRepository)
    sut = new GetUserService(usersRepository)
  })

  it("should return a user", async () => {
    const register = await registerService.execute({
      email: 'teste@email.com',
      username: 'Teste',
      password: '123456',
      companyId: 'company-id'
    })

    const user = await sut.execute(register.user.id)
    expect(user.email).toEqual('teste@email.com')
  })

  it('should not be able to get a user with wrong id', async () => {
    await expect(() => sut.execute('wrong-id')).rejects.toThrowError(ResourceNotFound)
  })
})