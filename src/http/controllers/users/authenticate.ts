import { makeAuthenticateService } from "@/services/factories/users/make-authenticate-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const service = makeAuthenticateService()
  const user = await service.execute({ email, password })
  const token = await reply.jwtSign({ id: user.id }, { expiresIn: '12h' })

  return reply.status(200).send({
    token,
    user: {
      email: user.email,
      username: user.username,
      role: user.role,
      id: user.id,
      avatar: user.avatarUrl
    }
  })
}

