import { makeDeleteMissionService } from "@/services/factories/missions/make-delete-mission-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteMission(request: FastifyRequest, reply: FastifyReply) {
  const deleteMissionParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteMissionParamsSchema.parse(request.params)

  const service = makeDeleteMissionService()
  await service.execute(id)

  return reply.status(204).send()
}