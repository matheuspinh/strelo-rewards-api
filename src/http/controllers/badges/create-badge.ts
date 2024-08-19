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
    classification: z.object({
      value: z.string().nonempty('Informe uma classificação para a conquista'),
    }),
    skillType: z.object({
      value: z.string().nonempty('Informe um tipo de habilidade para a conquista'),
    }),
  }).passthrough()

  const data = createBadgeBody.parse(request.body)

  const { title, description, classification, skillType } = data

  const image = data.image as MultipartFile

  const { companyId } = request.user

  const createBadgeService = makeCreateBadgeService()

  const badge = await createBadgeService.execute({
    companyId,
    title: title.value,
    description: description.value,
    image: image || null,
    classification: classification.value,
    skillType: skillType.value,
  })

  return reply.status(201).send(badge)
}