import { makeLevelUserService } from "@/services/factories/users/make-level-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function levelUser(request: FastifyRequest, reply: FastifyReply) {
  const levelUserParamsSchema = z.object({
    userId: z.string(),
    levelId: z.string()
  })

  const service = makeLevelUserService()

  const { userId, levelId } = levelUserParamsSchema.parse(request.params)

  console.log(userId, levelId)
  const user = await service.execute(userId, levelId)

  return reply.status(200).send()
}