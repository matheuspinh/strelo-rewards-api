import { Prisma } from "@prisma/client";
import { MissionsRepository } from "../missions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMissionsRepository implements MissionsRepository {
  async create(data: Prisma.MissionUncheckedCreateInput) {
    try {
      const mission = await prisma.mission.create({
        data: {
          ...data,
          users: Array.isArray(data.usersIDs) ? {
            connect: data.usersIDs.map((userId) => ({ id: userId })),
          } : undefined,
          badges: Array.isArray(data.badgesIDs) ? {
            connect: data.badgesIDs.map((badgeId) => ({ id: badgeId })),
          } : undefined,
        },
      });

      return mission;
    } catch (error) {
      throw new Error('Error creating mission')
    }
  }

  async listByCompany(companyId: string) {
    const missions = await prisma.mission.findMany({
      where: {
        companyId,
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          }
        },
        badges: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
          },
        },
        completedBy: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          }
        }
      }
    });

    return missions;
  }

  async delete(missionId: string) {
    const usersWithMission = await prisma.user.findMany({
      where: {
        missions: {
          some: {
            id: missionId
          }
        }
      }
    })

    const badgesWithMission = await prisma.badge.findMany({
      where: {
        missions: {
          some: {
            id: missionId
          }
        }
      }
    })

    const [, mission] = await prisma.$transaction([
      prisma.mission.update({
        where: {
          id: missionId
        },
        data: {
          badges: {
            disconnect: badgesWithMission.map(badge => ({ id: badge.id }))
          },
          users: {
            disconnect: usersWithMission.map(user => ({ id: user.id }))
          }
        }
      }),
      prisma.mission.delete({
        where: {
          id: missionId,
        },
      })
    ])
  }

  async findById(missionId: string) {
    const mission = await prisma.mission.findUnique({
      where: {
        id: missionId,
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          }
        },
        badges: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
          },
        },
        completedBy: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          }
        }
      }
    });

    return mission;
  }

  async update(missionId: string, data: Prisma.MissionUncheckedUpdateInput) {
    const missionToUpdate = await prisma.mission.findUnique({
      where: {
        id: missionId
      },
      include: {
        users: {
          select: {
            id: true
          }
        },
        badges: {
          select: {
            id: true
          }
        }
      }
    })
    const { usersIDs, badgesIDs } = data

    const currentUsersIds = missionToUpdate?.users ?? []
    const currentBadges = missionToUpdate?.badges ?? []
    let usersIDsToDisconnect
    let badgesIDsToDisconnect

    if (Array.isArray(usersIDs)) {
      usersIDsToDisconnect = currentUsersIds
        .filter(userId => !usersIDs.includes(userId.id))
        .map(userId => (userId))
    }

    if (Array.isArray(badgesIDs)) {
      badgesIDsToDisconnect = currentBadges
        .filter(badgeId => !badgesIDs.includes(badgeId.id))
        .map(badgeId => (badgeId))
    }

    const mission = await prisma.mission.update({
      where: {
        id: missionId,
      },
      data: {
        ...data,
        users: Array.isArray(data.usersIDs) ? {
          connect: data.usersIDs.map((userId) => ({ id: userId })),
          disconnect: usersIDsToDisconnect,
        } : undefined,
        badges: Array.isArray(data.badgesIDs) ? {
          connect: data.badgesIDs.map((badgeId) => ({ id: badgeId })),
          disconnect: badgesIDsToDisconnect
        } : undefined
      }
    });

    return mission;
  }
}