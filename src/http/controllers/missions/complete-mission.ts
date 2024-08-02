import { makeCompleteMissionService } from "@/services/factories/missions/make-complete-mission-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function completeMission(request: FastifyRequest, reply: FastifyReply) {
  const completeMissionBody = z.object({
    usersIds: z.array(z.string())
  })
  const completeMissionParams = z.object({
    missionId: z.string()
  })

  const { usersIds } = completeMissionBody.parse(request.body)
  const { missionId } = completeMissionParams.parse(request.params)

  const completeMissionService = makeCompleteMissionService()

  await completeMissionService.execute(missionId, usersIds)

  return reply.status(200).send()
}