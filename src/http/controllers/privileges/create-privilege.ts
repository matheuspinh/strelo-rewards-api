import { makeCreatePrivilegeService } from "@/services/factories/privileges/make-create-privilege-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPrivilege(request: FastifyRequest, reply: FastifyReply) {
  const createPrivilegeBody = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    companyId: z.string(),
    requiredBadgeId: z.string(),
    xp: z.number(),
    gold: z.number(),
    usersIds: z.array(z.string()).optional(),
  })

  const data = createPrivilegeBody.parse(request.body)

  const { companyId } = request.user

  const createPrivilegeService = makeCreatePrivilegeService()

  const privilege = await createPrivilegeService.execute({
    companyId,
    title: data.title,
    description: data.description,
    xp: data.xp,
    gold: data.gold,
    requiredBadgeId: data.requiredBadgeId,
    usersIDs: data.usersIds || []
  })

  return reply.status(201).send(privilege)
}