import { makeCreateLevelService } from "@/services/factories/levels/make-create-level-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createLevel(request: FastifyRequest, reply: FastifyReply) {
  const createLevelBody = z.object({
    title: z.string(),
    xpRequired: z.number(),
    goldReward: z.number().optional(),
    hardSkillsBadges: z.number(),
    softSkillsBadges: z.number(),
    previousLevelId: z.string().optional(),
    goldHardSkills: z.number(),
    goldSoftSkills: z.number(),
    silverHardSkills: z.number(),
    silverSoftSkills: z.number(),
    specificBadgeId: z.string().optional(),
  })

  const { companyId } = request.user

  const data = createLevelBody.parse(request.body)

  const service = makeCreateLevelService()
  const level = await service.execute({
    companyId,
    title: data.title,
    xpRequired: data.xpRequired,
    goldReward: data.goldReward || 0,
    hardSkillsBadges: data.hardSkillsBadges,
    softSkillsBadges: data.softSkillsBadges,
    previousLevelId: data.previousLevelId || undefined,
    goldHardSkills: data.goldHardSkills,
    goldSoftSkills: data.goldSoftSkills,
    silverHardSkills: data.silverHardSkills,
    silverSoftSkills: data.silverSoftSkills,
    specificBadgeId: data.specificBadgeId || undefined,
  })

  return reply.status(200).send(level)
}