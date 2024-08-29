import { makeGetLevelService } from "@/services/factories/levels/make-get-level-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getLevel(request: FastifyRequest, reply: FastifyReply) {
  const getLevelParamsSchema = z.object({
    levelId: z.string()
  })

  const { levelId } = getLevelParamsSchema.parse(request.params)

  const service = makeGetLevelService()

  const level = await service.execute(levelId)

  return reply.status(200).send(level)
}