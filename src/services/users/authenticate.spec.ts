import { FakeUsersRepository } from "@/repositories/fakes/fake-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate";
import { RegisterService } from "./register";
import { InvalidCredentialsError } from "../errors/user-errors";

let usersRepository: FakeUsersRepository
let registerService: RegisterService
let sut: AuthenticateService

describe('Login Service', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository()
    registerService = new RegisterService(usersRepository)
    sut = new AuthenticateService(usersRepository)

    await registerService.execute({
      email: 'teste@email.com',
      username: 'Teste',
      password: '123456',
      companyId: 'company-id'
    })
  })

  it('should be able to authenticate a user', async () => {
    const login = await sut.execute({
      email: 'teste@email.com',
      password: '123456'
    })

    expect(login).toHaveProperty('email')
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    await expect(() => sut.execute({
      email: 'teste@email.com',
      password: '1234567'
    })).rejects.toThrowError(InvalidCredentialsError)
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'mail@mail.com',
      password: '123456'
    })).rejects.toThrowError(InvalidCredentialsError)
  })
})