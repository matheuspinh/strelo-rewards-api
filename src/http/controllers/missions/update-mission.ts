import { makeUpdateMissionService } from "@/services/factories/missions/make-update-mission-service";
import { MultipartFile } from "@fastify/multipart";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateMission(request: FastifyRequest, reply: FastifyReply) {
  const updateMissionBodySchema = z.object({
    title: z.object({
      value: z.string().min(3),
    }),
    description: z.object({
      value: z.string().min(3),
    }),
    xp: z.object({
      value: z.string(),
    }),
    gold: z.object({
      value: z.string(),
    }),
    badges: z.object({
      value: z.string(),
    }),
    participants: z.object({
      value: z.string(),
    }),
    category: z.object({
      value: z.string(),
    }),
  }).passthrough()

  const updateMissionParamsSchema = z.object({
    missionId: z.string(),
  })

  const { missionId } = updateMissionParamsSchema.parse(request.params)

  const data = updateMissionBodySchema.parse(request.body)

  const { title, description, xp, gold, participants, badges, category } = data

  const image = data.image as MultipartFile

  const updateMissionService = makeUpdateMissionService()

  await updateMissionService.execute(missionId, {
    title: title.value,
    description: description.value,
    xp: Number(xp.value),
    gold: Number(gold.value),
    badgesIDs: JSON.parse(badges.value),
    usersIDs: JSON.parse(participants.value),
    image: image || null,
    category: category.value,
  })

  return reply.status(204).send()
}