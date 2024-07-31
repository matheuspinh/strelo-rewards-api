import { makeUpdatePrivilegeService } from "@/services/factories/privileges/make-update-privilege-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updatePrivilege(request: FastifyRequest, reply: FastifyReply) {
  const updatePrivilegeBody = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    companyId: z.string(),
    requiredBadgeId: z.string(),
    xp: z.number(),
    gold: z.number(),
    usersIds: z.array(z.string()).optional(),
  })

  const updatePrivilegeParams = z.object({
    privilegeId: z.string(),
  })

  const data = updatePrivilegeBody.parse(request.body)

  const { privilegeId } = updatePrivilegeParams.parse(request.params)

  const updatePrivilegeService = makeUpdatePrivilegeService()

  const privilege = await updatePrivilegeService.execute(privilegeId, {
    title: data.title,
    description: data.description,
    xp: data.xp,
    gold: data.gold,
    requiredBadgeID: data.requiredBadgeId,
    usersIDs: data.usersIds || [],
  })

  return reply.status(204).send(privilege)
}