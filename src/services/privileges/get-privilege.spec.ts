import { FakePrivilegesRepository } from "@/repositories/fakes/fake-privileges-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPrivilegeService } from "./get-privilege";

let privilegesRepository: FakePrivilegesRepository
let sut: GetPrivilegeService

describe('Get Privilege Service', () => {
  beforeEach(async () => {
    privilegesRepository = new FakePrivilegesRepository()
    sut = new GetPrivilegeService(privilegesRepository)
  })

  it('should return a privilege', async () => {
    const privilege = await privilegesRepository.create({
      title: 'any_name',
      description: 'any_description',
      companyId: 'any_company_id'
    })

    const foundPrivilege = await sut.execute(privilege.id)
    expect(foundPrivilege.title).toEqual('any_name')
  })

  it('should not be able to get a privilege with wrong id', async () => {
    await expect(() => sut.execute('wrong-id')).rejects.toThrowError('Privilégio não encontrado')
  })
})
