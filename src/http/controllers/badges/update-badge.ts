import { makeUpdateBadgeService } from "@/services/factories/badges/make-update-badge-service";
import { MultipartFile } from "@fastify/multipart";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateBadge(request: FastifyRequest, reply: FastifyReply) {
  const updateBadgeBodySchema = z.object({
    title: z.object({
      value: z.string().min(3),
    }),
    description: z.object({
      value: z.string().min(3),
    })
  }).passthrough()

  const updateBadgeParamsSchema = z.object({
    badgeId: z.string(),
  })

  const { badgeId } = updateBadgeParamsSchema.parse(request.params)

  const data = updateBadgeBodySchema.parse(request.body)

  const { title, description } = data

  const image = data.image as MultipartFile

  const updateBadgeService = makeUpdateBadgeService()

  await updateBadgeService.execute(badgeId, {
    title: title.value,
    description: description.value,
    image: image || null
  })

  return reply.status(204).send()
}