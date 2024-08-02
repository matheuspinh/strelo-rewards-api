import { makeDeletePrivilegeService } from "@/services/factories/privileges/make-delete-privilege-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePrivilege(request: FastifyRequest, reply: FastifyReply) {
  const deletePrivilegeParamsSchema = z.object({
    privilegeId: z.string(),
  })

  const { privilegeId } = deletePrivilegeParamsSchema.parse(request.params)

  const service = makeDeletePrivilegeService()
  await service.execute(privilegeId)

  return reply.status(204).send()
}