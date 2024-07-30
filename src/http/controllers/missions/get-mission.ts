import { makeGetMissionService } from "@/services/factories/missions/make-get-mission-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMission(request: FastifyRequest, reply: FastifyReply) {
  const getMissionParamsSchema = z.object({
    missionId: z.string()
  })

  const { missionId } = getMissionParamsSchema.parse(request.params)

  const service = makeGetMissionService()

  const mission = await service.execute(missionId)

  return reply.status(200).send({
    id: mission.id,
    imageUrl: mission.imageUrl,
    completedByIDs: mission.completedByIDs,
    usersIDs: mission.usersIDs,
    title: mission.title,
    description: mission.description,
    xp: mission.xp,
    gold: mission.gold,
    companyId: mission.companyId,
    users: mission.users,
    badges: mission.badges,
  })
}