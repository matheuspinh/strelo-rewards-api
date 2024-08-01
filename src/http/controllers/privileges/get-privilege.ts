import { makeGetPrivilegeService } from "@/services/factories/privileges/make-get-privilege-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPrivilege(request: FastifyRequest, reply: FastifyReply) {
  const getMissionParamsSchema = z.object({
    privilegeId: z.string()
  })

  const { privilegeId } = getMissionParamsSchema.parse(request.params)

  const service = makeGetPrivilegeService()

  const privilege = await service.execute(privilegeId)

  return reply.status(200).send(privilege)
}