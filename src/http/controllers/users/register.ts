import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterService } from '@/services/factories/users/make-register-service'
import { MultipartFile } from '@fastify/multipart'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    password: z.object({
      value: z.string().min(6),
    }),
    email: z.object({
      value: z.string().email(),
    }),
    username: z.object({
      value: z.string().min(3),
    }),
    role: z.object({
      value: z.string().optional(),
    }).optional(),
  }).passthrough()

  const data = registerBodySchema.parse(request.body)

  const { username, email, password, role } = data

  const image = data.image as MultipartFile

  const { companyId } = request.user
  const registerService = makeRegisterService()

  await registerService.execute({
    companyId,
    email: email.value,
    username: username.value,
    password: password.value,
    role: role ? role.value : 'user',
    image: image || null
  })

  return reply.status(201).send()
}
