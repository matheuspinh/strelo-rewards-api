import { makeListPrivilegesService } from "@/services/factories/privileges/make-list-privileges-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listPrivileges(request: FastifyRequest, reply: FastifyReply) {
  const { companyId } = request.user

  const service = makeListPrivilegesService()
  const privileges = await service.execute(companyId)

  return reply.status(200).send(privileges)
}