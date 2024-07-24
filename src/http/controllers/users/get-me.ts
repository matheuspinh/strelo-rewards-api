import { makeGetUserService } from "@/services/factories/users/make-get-user-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
  const service = makeGetUserService()

  const user = await service.execute(request.user.id)

  return reply.status(200).send({
    email: user.email,
    username: user.username,
    role: user.role,
    id: user.id,
    avatar: user.avatarUrl
  })
}