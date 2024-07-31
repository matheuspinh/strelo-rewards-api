import { makeListBadgeService } from "@/services/factories/badges/make-list-badge-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listBadges(request: FastifyRequest, reply: FastifyReply) {
  const listBadgesParamsSchema = z.object({
    companyId: z.string()
  })
  const { companyId } = listBadgesParamsSchema.parse(request.user)

  const service = makeListBadgeService()

  const badges = await service.execute(companyId)
  return reply.status(200).send(badges)
}