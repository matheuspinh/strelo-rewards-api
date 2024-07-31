import { makeDeleteBadgeService } from "@/services/factories/badges/make-delete-badge-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteBadge(request: FastifyRequest, reply: FastifyReply) {
  const deleteBadgeParamsSchema = z.object({
    badgeId: z.string(),
  })

  const { badgeId } = deleteBadgeParamsSchema.parse(request.params)

  const service = makeDeleteBadgeService()
  await service.execute(badgeId)

  return reply.status(204).send()
}