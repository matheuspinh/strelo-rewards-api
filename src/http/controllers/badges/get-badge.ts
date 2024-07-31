import { makeGetBadgeService } from "@/services/factories/badges/make-get-badge-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getBadge(request: FastifyRequest, reply: FastifyReply) {
  const getBadgeParamsSchema = z.object({
    badgeId: z.string()
  })

  const { badgeId } = getBadgeParamsSchema.parse(request.params)

  const service = makeGetBadgeService()

  const badge = await service.execute(badgeId)

  return reply.status(200).send(badge)
}