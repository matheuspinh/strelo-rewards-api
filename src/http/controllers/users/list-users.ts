import { makeListUsersService } from "@/services/factories/users/make-list-users-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const listUserQuerySchema = z.object({
    companyId: z.string(),
    userId: z.string()
  })

  const { companyId, userId } = listUserQuerySchema.parse(request.query)

  const service = makeListUsersService()
  const users = await service.execute({ companyId, userId })

  return reply.status(200).send(users)
}