import { Prisma, Privilege } from "@prisma/client";
import { PrivilegesRepository } from "../privileges-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPrivilegesRepository implements PrivilegesRepository {
  async create(data: Prisma.PrivilegeUncheckedCreateInput) {
    try {
      const { usersIDs, ...rest } = data;

      const privilege = await prisma.privilege.create({
        data: {
          ...rest,
          users: Array.isArray(data.usersIDs) ? {
            connect: data.usersIDs.map((userId) => ({ id: userId })),
          } : undefined,
        }
      });
      return privilege;
    } catch (error) {
      throw new Error('Error creating privilege')
    }
  }

  async listByCompanyId(companyId: string): Promise<Privilege[]> {
    const privileges = await prisma.privilege.findMany({
      where: {
        companyId
      },
      include: {
        users: {
          select: {
            id: true,
          }
        },
        requiredBadge: {
          select: {
            id: true,
          }
        }
      }
    })

    return privileges;
  }

  async findById(privilegeId: string) {
    const privilege = await prisma.privilege.findUnique({
      where: {
        id: privilegeId
      },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            username: true,
            avatarUrl: true,
            gold: true,
            xp: true,
          }
        },
        requiredBadge: {
          select: {
            id: true,
          }
        }
      }
    })
    return privilege;
  }

  async update(privilegeId: string, data: Prisma.PrivilegeUncheckedUpdateInput) {
    const privilegeToUpdate = await prisma.privilege.findUnique({
      where: {
        id: privilegeId
      },
      include: {
        users: {
          select: {
            id: true
          }
        },
      }
    })

    const { usersIDs } = data

    const currentUserIds = privilegeToUpdate?.users ?? [];

    let usersIDsToDisconnect

    if (Array.isArray(usersIDs)) {
      usersIDsToDisconnect = currentUserIds
        .filter((user) => !usersIDs.includes(user.id))
        .map(userId => userId)
    }

    const privilege = await prisma.privilege.update({
      where: {
        id: privilegeId
      },
      data: {
        ...data,
        users: Array.isArray(data.usersIDs) ? {
          connect: data.usersIDs.map((userId) => ({ id: userId })),
          disconnect: usersIDsToDisconnect
        } : undefined,
      }
    })

    return privilege;
  }

  async delete(privilegeId: string) {
    const usersWithPrivilege = await prisma.user.findMany({
      where: {
        privileges: {
          some: {
            id: privilegeId
          }
        }
      }
    })

    const [, privilege] = await prisma.$transaction([
      prisma.privilege.update({
        where: {
          id: privilegeId
        },
        data: {
          users: {
            disconnect: usersWithPrivilege.map(user => ({ id: user.id }))
          }
        }
      }),
      prisma.privilege.delete({
        where: {
          id: privilegeId
        }
      })
    ])
  }
}