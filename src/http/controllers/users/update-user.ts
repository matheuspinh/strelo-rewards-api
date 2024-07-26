import { makeUpdateUserService } from "@/services/factories/users/make-update-user-service";
import { MultipartFile } from "@fastify/multipart";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserBodySchema = z.object({
    password: z.object({
      value: z.string().min(6),
    }).optional(),
    email: z.object({
      value: z.string().email(),
    }).optional(),
    username: z.object({
      value: z.string().min(3),
    }).optional(),
  }).passthrough()

  const updateUserParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = updateUserParamsSchema.parse(request.params)

  const data = updateUserBodySchema.parse(request.body)

  const { username, email, password } = data

  const image = data.image as MultipartFile

  const updateUserService = makeUpdateUserService()

  await updateUserService.execute(userId,
    {
      email: email?.value,
      username: username?.value,
      password: password?.value,
      image: image || null
    })
}