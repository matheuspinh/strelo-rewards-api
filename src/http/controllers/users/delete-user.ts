import { makeDeleteUserService } from "@/services/factories/users/make-delete-user-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = deleteUserParamsSchema.parse(request.params)

  const service = makeDeleteUserService()
  await service.execute(userId)

  return reply.status(204).send()
}