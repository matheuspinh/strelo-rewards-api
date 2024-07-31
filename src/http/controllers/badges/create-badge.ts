import { makeCreateBadgeService } from "@/services/factories/badges/make-create-badge-service";
import { MultipartFile } from "@fastify/multipart";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createBadge(request: FastifyRequest, reply: FastifyReply) {
  const createBadgeBody = z.object({
    title: z.object({
      value: z.string().min(3),
    }),
    description: z.object({
      value: z.string().min(3),
    }),
  }).passthrough()

  const data = createBadgeBody.parse(request.body)

  const { title, description } = data

  const image = data.image as MultipartFile

  const { companyId } = request.user

  const createBadgeService = makeCreateBadgeService()

  const badge = await createBadgeService.execute({
    companyId,
    title: title.value,
    description: description.value,
    image: image || null
  })

  return reply.status(201).send(badge)
}