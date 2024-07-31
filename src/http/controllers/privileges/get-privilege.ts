import { makeGetMissionService } from "@/services/factories/missions/make-get-mission-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPrivilege(request: FastifyRequest, reply: FastifyReply) {
  const getMissionParamsSchema = z.object({
    privilegeId: z.string()
  })

  const { privilegeId } = getMissionParamsSchema.parse(request.params)

  const service = makeGetMissionService()

  const privilege = await service.execute(privilegeId)

  return reply.status(200).send(privilege)
}