import { makeUpdateLevelService } from "@/services/factories/levels/make-update-level-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateLevel(request: FastifyRequest, reply: FastifyReply) {
  const updateLevelBodySchema = z.object({
    title: z.string(),
    xpRequired: z.number(),
    goldReward: z.number().optional(),
    hardSkillsBadges: z.number(),
    softSkillsBadges: z.number(),
    previousLevelId: z.string().optional(),
    goldHardSkills: z.number().optional(),
    goldSoftSkills: z.number().optional(),
    silverSoftSkills: z.number().optional(),
    silverHardSkills: z.number().optional(),
    specificBadgeId: z.string().optional(),
  })

  const updateLevelParamsSchema = z.object({
    levelId: z.string()
  })

  const {
    title,
    xpRequired,
    goldReward,
    hardSkillsBadges,
    softSkillsBadges,
    previousLevelId,
    goldHardSkills,
    goldSoftSkills,
    silverSoftSkills,
    silverHardSkills,
    specificBadgeId,
  } = updateLevelBodySchema.parse(request.body)

  const { levelId } = updateLevelParamsSchema.parse(request.params)

  const updateLevelService = makeUpdateLevelService()

  const level = await updateLevelService.execute(levelId, {
    title,
    xpRequired,
    hardSkillsBadges,
    softSkillsBadges,
    previousLevelId: previousLevelId,
    goldHardSkills,
    goldSoftSkills,
    silverSoftSkills,
    silverHardSkills,
    specificBadgeId,
  })

  return reply.status(200).send(level)
}