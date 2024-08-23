import { makeListLevelService } from "@/services/factories/levels/make-list-level-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listLevels(request: FastifyRequest, reply: FastifyReply) {
  const { companyId } = request.user

  const service = makeListLevelService()
  const levels = await service.execute(companyId)

  return reply.status(200).send(levels)
}