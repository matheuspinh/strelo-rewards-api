import { makeGetUserService } from "@/services/factories/users/make-get-user-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const service = makeGetUserService()
  const getUserParamsSchema = z.object({
    userId: z.string().optional(),
  })

  const { userId: paramsUserId } = getUserParamsSchema.parse(request.params)
  let userId

  paramsUserId ? userId = paramsUserId : userId = request.user.id

  const user = await service.execute(userId)

  return reply.status(200).send({
    email: user.email,
    username: user.username,
    role: user.role,
    id: user.id,
    xp: user.xp,
    gold: user.gold,
    avatarUrl: user.avatarUrl,
    badges: user.badges,
    missions: user.missions,
    privileges: user.privileges,
    completedMissions: user.completedMissions,
    currentLevel: user.currentLevel,
    nextLevel: user.currentLevel?.nextLevel[0] || null,
  })
}