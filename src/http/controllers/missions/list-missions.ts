import { makeListMissionService } from "@/services/factories/missions/make-list-mission-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listMissions(request: FastifyRequest, reply: FastifyReply) {
  const { companyId } = request.user

  const service = makeListMissionService()
  const missions = await service.execute(companyId)

  return reply.status(200).send(missions)
}