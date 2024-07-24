import { beforeEach, describe, expect, it } from "vitest";
import { FakeUsersRepository } from "@/repositories/fakes/fake-users-repository";
import { ListUsersService } from "./list-users";
import { RegisterService } from "./register";
import { UserUnauthorizedError } from "../errors/user-errors";
import { ResourceNotFound } from "../errors/general-errors";

let usersRepository: FakeUsersRepository
let registerService: RegisterService
let sut: ListUsersService

describe('List Users Service', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository()
    registerService = new RegisterService(usersRepository)
    sut = new ListUsersService(usersRepository)

    await registerService.execute({
      email: 'teste@email.com',
      username: 'Teste',
      password: '123456',
      companyId: 'company-id'
    })
    await registerService.execute({
      email: 'teste2@email.com',
      username: 'Teste2',
      password: '123456',
      companyId: 'company-id'
    })
    await registerService.execute({
      email: 'teste3@email.com',
      username: 'Teste3',
      password: '123456',
      companyId: 'company-id2'
    })
  })

  it('should be able to list two users from company 1', async () => {
    const { user: adminUser } = await registerService.execute({
      email: 'admin@email.com',
      username: 'admin',
      password: '123456',
      companyId: 'company-id',
      role: 'admin'
    })

    const { users } = await sut.execute({
      companyId: adminUser.companyId,
      userId: adminUser.id
    })

    expect(users).toHaveLength(2)
  })

  it('should be able to list one user from company 2', async () => {
    const { user: adminUser } = await registerService.execute({
      email: 'admin@email.com',
      username: 'admin',
      password: '123456',
      companyId: 'company-id2',
      role: 'admin'
    })

    const { users } = await sut.execute({
      companyId: adminUser.companyId,
      userId: adminUser.id
    })

    expect(users).toHaveLength(1)
  })

  it('should count the users correctly', async () => {
    const { user: adminUser } = await registerService.execute({
      email: 'admin@email.com',
      username: 'admin',
      password: '123456',
      companyId: 'company-id',
      role: 'admin'
    })

    const { userCount } = await sut.execute({
      companyId: adminUser.companyId,
      userId: adminUser.id
    })

    expect(userCount).toEqual(2)
  })

  it('should not be able to list users from a company that the user is not admin', async () => {
    const { user } = await registerService.execute({
      email: 'user@mail.com',
      username: 'user',
      password: '123456',
      companyId: 'company-id',
    })

    await expect(() => sut.execute({
      companyId: user.companyId,
      userId: user.id
    })).rejects.toThrowError(new UserUnauthorizedError())
  })

  it('should not be able to list users with an invalid user id', async () => {
    await expect(() => sut.execute({
      companyId: 'company-id',
      userId: 'invalid-id'
    })).rejects.toThrowError(new ResourceNotFound('Usuário não encontrado'))
  })
})