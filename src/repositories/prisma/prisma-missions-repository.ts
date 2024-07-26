import { Prisma, Mission } from "@prisma/client";
import { MissionsRepository } from "../missions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMissionsRepository implements MissionsRepository {
  async create(data: Prisma.MissionUncheckedCreateInput): Promise<Mission> {
    const mission = await prisma.mission.create({
      data,
    });

    return mission;
  }

  async listByCompany(companyId: string): Promise<Mission[]> {
    const missions = await prisma.mission.findMany({
      where: {
        companyId,
      },
    });

    return missions;
  }

  async delete(missionId: string): Promise<void> {
    await prisma.mission.delete({
      where: {
        id: missionId,
      },
    });
  }
}