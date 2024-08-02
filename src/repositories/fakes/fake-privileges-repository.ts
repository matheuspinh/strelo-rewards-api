import { Prisma, Privilege } from "@prisma/client";
import { PrivilegesRepository } from "../privileges-repository";
import { randomUUID } from "crypto";

export class FakePrivilegesRepository implements PrivilegesRepository {
  public items: Privilege[] = []

  async create(data: Prisma.PrivilegeUncheckedCreateInput) {
    const privilege = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      xp: data.xp || 0,
      gold: data.gold || 0,
      usersIDs: [] as string[],
      users: [],
      companyId: data.companyId,
      requiredBadgeID: null,
      requiredBadge: {},
    }

    this.items.push(privilege)

    return privilege
  }

  async listByCompanyId(companyId: string): Promise<Privilege[]> {
    return this.items.filter(privilege => privilege.companyId === companyId)
  }

  async delete(privilegeId: string) {
    const privilegeIndex = this.items.findIndex((item) => item.id === privilegeId)

    if (privilegeIndex === -1) {
      throw new Error('Privilege not found')
    }

    this.items.splice(privilegeIndex, 1)

    return Promise.resolve()
  }

  async findById(privilegeId: string): Promise<Privilege | null> {
    const privilege = this.items.find((item) => item.id === privilegeId)

    if (!privilege) {
      return null
    }

    return privilege
  }

  async update(privilegeId: string, data: Prisma.PrivilegeUncheckedUpdateInput): Promise<Privilege> {
    const privilegeIndex = this.items.findIndex((item) => item.id === privilegeId)

    if (privilegeIndex === -1) {
      throw new Error('Privilege not found')
    }

    const privilege = this.items[privilegeIndex]

    Object.assign(privilege, data)

    this.items[privilegeIndex] = privilege

    return Promise.resolve(this.items[privilegeIndex])
  }
}