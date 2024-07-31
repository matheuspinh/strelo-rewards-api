import { makeCreateMissionService } from "@/services/factories/missions/make-create-mission-service";
import { MultipartFile } from "@fastify/multipart";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMission(request: FastifyRequest, reply: FastifyReply) {
  const createMissionBody = z.object({
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
  }).passthrough()

  const data = createMissionBody.parse(request.body)

  const { title, description, xp, gold, participants, badges } = data

  const image = data.image as MultipartFile

  const { companyId } = request.user

  const createMissionService = makeCreateMissionService()

  const mission = await createMissionService.execute({
    companyId,
    title: title.value,
    description: description.value,
    xp: Number(xp.value),
    gold: Number(gold.value),
    badgesIDs: JSON.parse(badges.value),
    usersIDs: JSON.parse(participants.value),
    image: image || null
  })

  return reply.status(201).send(mission)
}
